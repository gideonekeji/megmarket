"use client";
import Image from "next/image";
import logo from "../../../public/assets/Image/logo.png";
import emailicon from "../../../public/assets/Image/emailicon.png";
import callicon from "../../../public/assets/Image/callicon.png";
import instaicon from "../../../public/assets/Image/insta.png";
import fbicon from "../../../public/assets/Image/fb.png";
import cross from "../../../public/assets/Image/cross.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../storeApp/Slice/modalSlice";
import { useAppSelector } from "../hooks/hooks";
import LoginModal from "../(Auth)/loginaccount/page";
import AddPostModal from "../AddPost/page";
import RegisterModal from "../(Auth)/registeraccount/page";
import RegisterModalVerifyOtpModal from "../(Auth)/RegisterModalVerifyOtpModal/page";
import RegisterWithMobailnumberModal from "../(Auth)/RegisterWithMobailnumber/page";
import RegisterWithMobilenumberVerifyOtpModal from "../(Auth)/RegisterWithMobilenumberVerifyOtpModal/RegisterWithMobilenumberVerifyOtpModal";
import ForgotPasswordModal from "../(Auth)/ForgotPasswordModal/ForgotPasswordModal";
import ForgotPasswordOtpVerfiyModal from "../(Auth)/ForgotPasswordOtpVerfiyModal/ForgotPasswordOtpVerfiyModal";
import ResetPasswordModal from "../(Auth)/ResetPasswordModal/ResetPasswordModal";
import Cookies from "js-cookie";
import RightSideAfterLogin from "../header/RightSideAfterLogin";
import DeleteAccountModal from "../componets/modal/DeleteAccountModal";
import AppFeedbackModal from "../componets/modal/AppFeedbackModal";
import AppLanguageModal from "../componets/modal/AppLanguageModal";
import ShareAppModal from "../componets/modal/ShareAppModal";
import LogoutModal from "../componets/modal/LogoutModal";
import ServiceDetailScreenModalImage from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenModalImage";
import ServiceDetailScreenFiltterModal from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenFiltterModal";
import ServiceDetailScreenRatingModal from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenRatingModal";
import ServiceDetailScreenImageSubModal from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenImageSubModal";
import RegisterWithMobailNumberOtpVerify from "../(Auth)/RegisterWithMobailNumberOtpVerify/RegisterWithMobailNumberOtpVerify";
import { selectAnyModalOpen } from "@/app/storeApp/Slice/modalSlice";
import { usePathname, useRouter } from "next/navigation";
import MessageSendModal from "../componets/message/MessageBox/MessageSendModal";
import VendorInfoModal from "../componets/message/MessageBox/VendorInfoModal";
import Messagebtn from "../componets/message/messagebtn";
import CampaignModal from "../componets/Mybusiness/SponsorComponets/RightsideSponser/CampaignModal";
import Paymentsuccessful from "../componets/Mybusiness/PaymentComponets/Paymentsuccessful";
import StoresDetailModal from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/StoresDetailModal";
import ServiceDetailScreenFiltterModalDetail from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ServiceDetailScreenFiltterModalDetail";
import EditReviewModal from "../componets/Profile/Myreview/EditReviewModal";
import DeleteReviewModal from "../componets/Profile/Myreview/DeleteReviewModal";
import SponcerModalAfterAdd from "../componets/Mybusiness/SponsorComponets/RightsideSponser/SponcerModalAfterAdd";
import BusinessNameModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessNameModal";
import ContactDetailsModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/ContactDetailsModal";
import BusinessAddressToolsModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessAddressToolsModal";
import BusinessTimingsModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessTimingsModal";
import YearEstablishmentModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/YearEstablishmentModal";
import BusinesscategoriesModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinesscategoriesModal";
import NumberofEmployeesModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/NumberofEmployeesModal";
import BusinessImagesModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessImagesModal";
import BusinessWebsiteModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessWebsiteModal";
import FollowSocialMediaModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/FollowSocialMediaModal";
import AddStoreModal from "../componets/Mybusiness/BusinessService/Service/AddStore/AddStoreModal";
import UpdateAddStoreModal from "../componets/Mybusiness/BusinessService/Service/UpdateStore/UpdateAddStoreModal";
import DeleteStoreModal from "../componets/Mybusiness/BusinessService/Service/UpdateStore/DeleteStoreModal";
import BusinessVideoModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/BusinessVideoModal";
import BusinessPorfileUpdateModal from "../componets/Mybusiness/BusinessQuickLinks/BusinessPorfileUpdateModal";
import BusinessRebiewListModal from "../componets/Mybusiness/BusinessQuickLinks/BusinessRebiewListModal";
import CompleteBusinessModal from "../componets/Mybusiness/BusinessTools/ModalBusiness/CompleteBusinessModal";
import CompleteAddressModal from "../AddPost/BusinessDetail/BusinessDetailForm/CompleteAddressModal";
import ImageModalMessage from "../componets/message/MessageBox/ImageModalMessage";
import ImageModalRightSide from "../componets/message/MessageBox/ImageModalRightSide";
import CheackStoreAdd from "../bussines/CheackStoreAdd";
import Dropdwonlangugae from "../componets/Language/Dropdwonlangugae";
import CheackStoreandPlaneModal from "../bussines/CheackStoreandPlaneModal";
import useTranslation from "../hooks/useTranslation";
import ViewAllRatingModal from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/LeftSideDetailCompomponets/ViewAllRatingModal";
import CheackUserNameSocailLOgin from "../componets/CheackUserNameSocailLOgin";
import PlaceExpireModal from "../bussines/PlaceExpireModal";
import currentrouteimage from "../../../public/assets/Image/demo@.png"
import { usegetLive } from "../storeApp/api/usegetLive";
import { resetLocation } from "../storeApp/Slice/locationSearchHomeSlice";
import { setSelectedCategoryListing } from "../storeApp/Slice/Listing/CategoryLIstingSlice";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const user_id = Cookies.get("loginuser");
  const login_type = Cookies.get("login_token");
  const router = useRouter();
  const myuser_id = Cookies.get("user_id");



  const _live = usegetLive() as any;
  const data = _live?.data;

  useEffect(() => {
    // `data` shape is provided by `usegetLive`. narrow with runtime guard to avoid TS errors
    const isPayment = (data as any)?.is_payment;
    if (isPayment) {
      Cookies.set("demo", isPayment);
    } else {
      Cookies.remove("demo");
    }
  }, [data]);

  const subscriber_user = Cookies.get("subscriber_user");

  const [isServiceFormSubmit, setPlaneName] = useState<string | null>(null);

  // Fetch the cookie value on component mount
  useEffect(() => {
    const currentPlaneName = Cookies.get("plane_name") || null;
    setPlaneName(currentPlaneName);
    console.log("Initial plane_name:", currentPlaneName);
  }, []);

  // Listen for updates to the cookie value
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedPlaneName = Cookies.get("is_store") || null;
      if (updatedPlaneName !== isServiceFormSubmit) {
        setPlaneName(updatedPlaneName);
        console.log("Updated plane_name:", updatedPlaneName);
      }
    }, 100); // Check every second

    return () => clearInterval(interval);
  }, [isServiceFormSubmit]);

  console.log(" my scunrrice id ", subscriber_user);

  // MODAL OPEN CLOSE CURRENT

  const dispatch = useDispatch();

  const isLoginModalVisible = useAppSelector(
    (state) => state.modals.loginModal
  );

  const isAddPostModalVisible = useAppSelector(
    (state) => state.modals.AddPostModal
  );

  const isRegisterModalVisible = useAppSelector(
    (state) => state.modals.RegisterModal
  );

  const isRegisterModalVerifyOtpModalVisibile = useAppSelector(
    (state) => state.modals.RegisterModalVerifyOtpModal
  );

  const isRegisterWithMobilenumberModalVisibile = useAppSelector(
    (state) => state.modals.RegisterWithMobilenumber
  );

  const isRegisterWithMobilenumberVerifyOtpModalVisibile = useAppSelector(
    (state) => state.modals.RegisterWithMobilenumberVerifyOtpModal
  );

  const isForgotPasswordModalVisibile = useAppSelector(
    (state) => state.modals.ForgotPasswordModal
  );

  const isForgotPasswordOtpVerfiyModalVisibile = useAppSelector(
    (state) => state.modals.ForgotPasswordOtpVerfiyModal
  );

  const isResetPasswordModalVisibile = useAppSelector(
    (state) => state.modals.ResetPasswordModal
  );

  const isDeleteAccountVisibile = useAppSelector(
    (state) => state.modals.DeleteAccount
  );

  const isAppFeedbackVisibile = useAppSelector(
    (state) => state.modals.AppFeedback
  );

  const isAppLanguageModalVisibile = useAppSelector(
    (state) => state.modals.AppLanguage
  );

  const isShareAppModalVisibile = useAppSelector(
    (state) => state.modals.ShareAppModal
  );

  const isLogoutModalVisibile = useAppSelector(
    (state) => state.modals.LogoutModal
  );

  const isCompleteAddressModalVisibile = useAppSelector(
    (state) => state.modals.CompleteAddressModal
  );

  const isServiceDetailScreenModalImageVisible = useAppSelector(
    (state) => state.modals.ServiceDetailScreenModalImage
  );

  const isServiceDetailScreenFiltterModalVisibile = useAppSelector(
    (state) => state.modals.ServiceDetailScreenFiltterModal
  );

  const isServiceDetailScreenRatingModalVisibile = useAppSelector(
    (state) => state.modals.ServiceDetailScreenRatingModal
  );

  const isServiceDetailScreenImageSubModalVisibile = useAppSelector(
    (state) => state.modals.ServiceDetailScreenImageSubModal
  );

  const isBusinessNameModalVisibile = useAppSelector(
    (state) => state.modals.BusinessNameModal
  );

  const isContactDetailsModalVisibile = useAppSelector(
    (state) => state.modals.ContactDetailsModal
  );

  const isBusinessAddressToolsModalVisibile = useAppSelector(
    (state) => state.modals.BusinessAddressToolsModal
  );

  const isBusinessTimingsModalVisibile = useAppSelector(
    (state) => state.modals.BusinessTimingsModal
  );

  const isYearEstablishmentModalVisibile = useAppSelector(
    (state) => state.modals.YearEstablishmentModal
  );

  const isBusinesscategoriesModalVisibile = useAppSelector(
    (state) => state.modals.BusinesscategoriesModal
  );

  const isNumberofEmployeesModalVisibile = useAppSelector(
    (state) => state.modals.NumberofEmployeesModal
  );

  const isBusinessImagesModalVisibile = useAppSelector(
    (state) => state.modals.BusinessImagesModal
  );

  const isBusinessWebsiteModalVisibile = useAppSelector(
    (state) => state.modals.BusinessWebsiteModal
  );

  const isFollowSocialMediaModalVisibile = useAppSelector(
    (state) => state.modals.FollowSocialMediaModal
  );

  const isAddStoreModalVisibile = useAppSelector(
    (state) => state.modals.AddStoreModal
  );

  const isUpdateAddStoreModalVisibile = useAppSelector(
    (state) => state.modals.UpdateAddStoreModal
  );

  const isDeleteStoreModalVisibile = useAppSelector(
    (state) => state.modals.DeleteStoreModal
  );

  const isRegisterWithMobailNumberOtpVerifyVisibile = useAppSelector(
    (state) => state.modals.RegisterWithMobailNumberOtpVerify
  );

  const isBusinessVideoModalVisible = useAppSelector(
    (state) => state.modals.BusinessVideoModal
  );

  const isBusinessPorfileUpdateModal = useAppSelector(
    (state) => state.modals.BusinessPorfileUpdateModal
  );

  const isBusinessRebiewListModalVisible = useAppSelector(
    (state) => state.modals.BusinessRebiewListModal
  );

  const isCompleteBusinessModalVisible = useAppSelector(
    (state) => state.modals.CompleteBusinessModal
  );

  const isMessageSendModalVisible = useAppSelector(
    (state) => state.modals.MessageSendModal
  );

  const isVendorInfoModalVisible = useAppSelector(
    (state) => state.modals.VendorInfoModal
  );

  const isCampaignModalVisible = useAppSelector(
    (state) => state.modals.CampaignModal
  );

  const isPaymentsuccessfulVisile = useAppSelector(
    (state) => state.modals.Paymentsuccessful
  );

  const isStoresDetailModalVisibility = useAppSelector(
    (state) => state.modals.StoresDetailModal
  );

  const isServiceDetailScreenFiltterModalDetailVisibility = useAppSelector(
    (state) => state.modals.ServiceDetailScreenFiltterModalDetail
  );

  const isDeleteReviewModalVisibility = useAppSelector(
    (state) => state.modals.DeleteReviewModal
  );

  const isEditReviewModalVisibility = useAppSelector(
    (state) => state.modals.EditReviewModal
  );

  const isSponcerModalAfterAddVisibility = useAppSelector(
    (state) => state.modals.SponcerModalAfterAdd
  );

  const isImageModalMessageVisibility = useAppSelector(
    (state) => state.modals.ImageModalMessage
  );

  const isImageModalRightSideVisibility = useAppSelector(
    (state) => state.modals.ImageModalRightSide
  );

  const isCheackStoreAddVisibility = useAppSelector(
    (state) => state.modals.CheackStoreAdd
  );

  const isCheackStoreandPlaneModalVisibility = useAppSelector(
    (state) => state.modals.CheackStoreandPlaneModal
  );

  const isViewAllRatingModalVisibility = useAppSelector(
    (state) => state.modals.ViewAllRatingModal
  );

  const isCheackUserNameSocailLOginVisibility = useAppSelector(
    (state) => state.modals.CheackUserNameSocailLOgin
  );

  const isPlaceExpireModalVisibility = useAppSelector(
    (state) => state.modals.PlaceExpireModal
  );

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);




  // Handle scroll event to toggle sticky state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true); // Sticky state when scrolled beyond 10px
      } else {
        setIsSticky(false); // Reset state when scrolled back to the top
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isAnyModalOpen = useSelector(selectAnyModalOpen);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const handalmessage = () => {
    router.push("/message");
  };


  const { getTranslation } = useTranslation();


  const pathname = usePathname();


  const demoCookie = Cookies.get("demo");

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Stores", href: "/store" },
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contactus" },
    // Only include Subscribe if demoCookie exists
    ...(demoCookie ? [{ label: "Subscribe", href: "/Subscribe" }] : [])
  ];



  const token = Cookies.get("nlyticalwebtoken")


  return (
    <header
      className={`w-full  ${isSticky ? "header-area bg-black" : ""} ${isAnyModalOpen ? " z-10" : "z-50"
        }`}
    >
      <div
        className={`hidden h-auto w-full  xl:block  ${isDarkMode ? "text-white  bg-[#226FE4]" : "  bg-[#202020] "
          }`}
      >
        {/* Header Top Section */}
        <div className="mx-auto flex w-[90%] items-center justify-between py-2 2xl:w-[80%]">
          {/* Left side part */}
          <div className="flex w-fit items-center justify-between gap-8">
            <div className="flex cursor-pointer items-center gap-2">
              {/* Email Icon */}
              <div className="h-5 w-5">
                <Image
                  src={emailicon}
                  alt="Email Icon"
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <a
                  href="mailto:info@megmarketafrica.com"
                  className="font-poppins text-T12 text-white"
                >
                  info@megmarketafrica.com
                </a>
              </div>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              {/* Phone Icon */}
              <div className="h-5 w-5">
                <Image src={callicon} alt="Call Icon" width={20} height={20} />
              </div>
              <div>
                <a
                  href="tel:+355695509143"
                  className="font-poppins  text-T12 text-white"
                >
                  +355 69 550 9143
                </a>
              </div>
            </div>
          </div>

          {/* Right side part */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="cursor-pointer">
                <p className="font-poppins  text-T12 text-white">
                  {getTranslation("Follow Us", "Follow Us")}
                </p>
              </div>

              <div className="flex h-5 w-5 cursor-pointer items-center justify-center">
                <a href="https://www.instagram.com/primocys/" target="_blank">
                  <Image
                    src={instaicon}
                    alt="Instagram Icon"
                    width={20}
                    height={20}
                  />
                </a>
              </div>

              <div className="h-5 w-5 cursor-pointer">
                <a href="https://www.facebook.com/primocys" target="_blank">
                  <Image
                    src={fbicon}
                    alt="Facebook Icon"
                    width={20}
                    height={20}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section Header */}
      <div
        className={`z-50 w-full  shadow-lg  dark:bg-dark-secondarybg  bg-light-background  `}
      >
        <div className="mx-auto flex h-[4rem] w-[95%] items-center justify-between xl:h-[5rem] 2xl:w-[80%]">
          {/* Logo */}
          <div className=" ">
            <div className="flex h-[2rem] w-full cursor-pointer justify-center xl:h-auto xl:w-[7rem] 2xl:w-[9rem]">
              <Link href={"/"}>
                <Image
                  src={logo}
                  alt="Logo"
                  width={200}
                  height={72}

                  className={` h-[1.8rem]   md:h-auto max-h-12  w-auto max-w-[100px] object-contain sm:max-w-[140px] xl:max-w-[180px] 2xl:max-w-[200px]`}

                />
              </Link>
            </div>
          </div>

          {/* Center content (Desktop view) */}
          <div className="hidden h-full items-center justify-center xl:flex">
            <ul className="flex w-full cursor-pointer items-center justify-center gap-3 text-sm font-[500] text-black sm:text-base">
              {navItems.map(({ label, href }) => {
                const isActive = pathname === href;

                // Function to handle click
                const handleClick = (e: React.MouseEvent) => {
                  if (label === "Stores") {
                    e.preventDefault(); // Prevent navigation if you want
                    dispatch(resetLocation())
                    dispatch(setSelectedCategoryListing({ id: null, category_name: "" }));
                    sessionStorage.removeItem("Category_Name");
                    sessionStorage.removeItem("Category_ID");
                    router.push("/store");
                  }
                };

                return (
                  <li key={label} className="group relative cursor-pointer p-2 sm:p-3">
                    <Link
                      href={href}
                      passHref
                      onClick={handleClick} // <-- add this
                      className={`font-poppins relative z-10 font-normal text-T6 transition-colors duration-300 
            ${isDarkMode ? "text-[#FFFFFFCC]" : "text-black"} 
            ${isActive ? "text-light-button-base font-semibold" : ""}
          `}
                    >
                      {getTranslation(label, label)}
                    </Link>
                    <div className="absolute bottom-1 left-0 right-0">
                      <div
                        className={`h-[2px] rounded-full hidden transition-all duration-300 
              ${isActive ? "scale-x-100 bg-[#0046AE]" : "scale-x-0 group-hover:scale-x-100"} 
              ${!isActive && "bg-white"}
            `}
                      ></div>
                      {isActive && <Image src={currentrouteimage} alt="currentrouteimage" />}
                    </div>
                  </li>
                );
              })}
            </ul>

          </div>

          <div className="flex items-center justify-between  gap-2   ">
            {/* Profile btn (Right side) */}
            <div className="flex items-center justify-end gap-2 md:pr-3 xl:pr-0">
              {/* Dropdown for language */}
              <div className="hidden md:flex mx-auto w-fit max-w-sm items-end justify-end">
                <div className="flex items-center justify-between">
                  <Dropdwonlangugae />
                </div>
              </div>

              {/* Buttons for 'Post Your Ad' and 'Sign In' */}
              <div className="flex items-center justify-center gap-6">

                {isServiceFormSubmit !== "1" && demoCookie && (
                  <div
                    className="hidden md:flex cursor-pointer items-center justify-center rounded-lg bg-light-button-base px-6 py-[10px]"
                    onClick={() => {
                      if (user_id && subscriber_user === "1") {
                        dispatch(showModal("AddPostModal"));
                      } else {
                        router.push("/Subscribe");
                      }
                    }}
                  >
                    <button className="font-poppins font-[500] text-white">{getTranslation("Add Store ", "Add Store ")}</button>
                  </div>
                )}
                {/*  if user id not exit then show login modal  */}
                <div
                  onClick={() => {
                    if (myuser_id) {
                      handalmessage();
                    } else {
                      dispatch(showModal("loginModal"));
                    }
                  }}
                >
                  <Messagebtn />
                </div>


                {/* Conditional rendering based on user_id */}
                {token || login_type ? (
                  <RightSideAfterLogin /> // This will be shown if user_id exists
                ) : (
                  <div
                    className="hidden xl:flex cursor-pointer items-center justify-center rounded-lg border-2 border-light-button-base px-6 py-2"
                    onClick={() => {
                      if (!token || !login_type) {
                        dispatch(showModal("loginModal"));
                      }
                    }}
                  >
                    <button className="font-poppins font-[500]  text-light-button-base">
                      {getTranslation("Sign In", "Sign In")}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu and profile (Mobile view) */}
            <div className="flex w-fit items-end justify-end gap-4 py-4 xl:hidden">
              {/* Hamburger menu icon */}
              <div
                className="flex cursor-pointer items-center  dark:text-dark-darkcolor justify-center text-2xl"
                onClick={handleMenuToggle}
              >
                ☰
              </div>
            </div>
          </div>

          {/* Full-screen sliding menu (Mobile view) */}
          <div
            className={`fixed right-0 top-0 z-50 flex h-full w-full transform justify-end bg-black bg-opacity-80 transition-all duration-500 xl:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div
              className={`flex h-auto w-full flex-col   bg-light-background  dark:bg-dark-secondarybg  p-4 transition-all duration-500 ${isMenuOpen ? "h-screen" : "h-full"
                }`}
            >
              <div className="flex w-full items-start justify-between">
                <div className=" ">
                  <div className="flex h-[2rem] w-full cursor-pointer justify-center xl:h-auto xl:w-[7rem] 2xl:w-[9rem]">
                    <Link href={"/"}>
                      <Image
                        src={logo}
                        alt="Logo"
                        width={200}
                        height={72}

                        className={` h-[1.8rem]   md:h-auto max-h-12   w-auto max-w-[100px] object-contain sm:max-w-[140px] xl:max-w-[180px] 2xl:max-w-[200px]`}

                      />
                    </Link>
                  </div>
                </div>
                <button
                  className={`flex h-12 w-12 items-start font-semibold text-black  ${isDarkMode ? " bg-circle-icon" : ""}`}
                  onClick={handleMenuToggle}
                >
                  <Image src={cross} alt="Close Icon" className="h-8 w-8" />
                </button>
              </div>

              {/* Navigation Links */}
              <ul className="font-poppins text-B3  text-black  dark:text-dark-darkcolor">
                <li className="py-4  font-normal">
                  <Link href="/" onClick={handleCloseMenu}>
                    {getTranslation("Home", "Home")}
                  </Link>
                </li>
                <hr />
                <li className="py-4 font-normal">
                  <Link href="/store" onClick={handleCloseMenu}>
                    {getTranslation("Stores", "Stores")}
                  </Link>
                </li>
                <hr />

                {isMenuOpen && (
                  <div className="pointer-events-auto  translate-y-0 opacity-100 transition-all duration-300 ease-out">
                    <li className="py-4 font-normal">
                      <Link href="/about" onClick={handleCloseMenu}>
                        {getTranslation("About", "About")}
                      </Link>
                    </li>
                    <hr />
                    {demoCookie && (
                      <li className="py-4 font-normal">
                        <Link href="/Subscribe" onClick={handleCloseMenu}>
                          {getTranslation("Subscribe", "Subscribe")}
                        </Link>
                      </li>
                    )}

                    <hr />
                    <li className="py-4 font-normal">
                      <Link href="/contactus" onClick={handleCloseMenu}>
                        {getTranslation("Contact Us", "Contact Us")}
                      </Link>
                    </li>
                    <hr />
                  </div>
                )}
              </ul>

              <div className="mt-4 flex w-full items-center justify-between">
                {isServiceFormSubmit !== "1" && demoCookie && (
                  <div
                    className="flex cursor-pointer items-center justify-center rounded-lg bg-light-button-base px-4 py-[10px] small:px-[5px] xl:hidden"
                    onClick={() => {
                      if (user_id) {
                        dispatch(showModal("AddPostModal"));
                      } else {
                        dispatch(showModal("loginModal"));
                      }
                    }}
                  >
                    <button className="font-poppins text-xs font-[500] text-[#FFFFFF]">
                      {getTranslation("Add Store", "Add Store")}
                    </button>
                  </div>
                )}
                {!user_id && (
                  <div
                    className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-light-button-base px-3 py-2 hover:bg-slate-200 small:px-[9px] xl:hidden"
                    onClick={() => {
                      dispatch(showModal("loginModal"));
                      setIsMenuOpen(false);
                    }}
                  >
                    <button className="font-poppins text-xs font-[500] text-[#0046AE]">
                      {getTranslation("Sign In", "Sign In")}
                    </button>
                  </div>
                )}

                <div className="flex items-start justify-start">
                  {/* Language Icon Button */}
                  <Dropdwonlangugae />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoginModalVisible && <LoginModal />}
      {isAddPostModalVisible && <AddPostModal />}
      {isRegisterModalVisible && <RegisterModal />}
      {isRegisterModalVerifyOtpModalVisibile && <RegisterModalVerifyOtpModal />}
      {isRegisterWithMobilenumberModalVisibile && (
        <RegisterWithMobailnumberModal />
      )}
      {isRegisterWithMobilenumberVerifyOtpModalVisibile && (
        <RegisterWithMobilenumberVerifyOtpModal />
      )}

      {isForgotPasswordModalVisibile && <ForgotPasswordModal />}
      {isForgotPasswordOtpVerfiyModalVisibile && (
        <ForgotPasswordOtpVerfiyModal />
      )}
      {isResetPasswordModalVisibile && <ResetPasswordModal />}
      {isDeleteAccountVisibile && <DeleteAccountModal />}

      {isAppFeedbackVisibile && <AppFeedbackModal />}
      {isAppLanguageModalVisibile && <AppLanguageModal />}
      {isShareAppModalVisibile && <ShareAppModal />}
      {isLogoutModalVisibile && <LogoutModal />}
      {isCompleteAddressModalVisibile && <CompleteAddressModal />}
      {isServiceDetailScreenModalImageVisible && (
        <ServiceDetailScreenModalImage />
      )}
      {isServiceDetailScreenFiltterModalVisibile && (
        <ServiceDetailScreenFiltterModal />
      )}

      {isServiceDetailScreenRatingModalVisibile && (
        <ServiceDetailScreenRatingModal />
      )}

      {isServiceDetailScreenImageSubModalVisibile && (
        <ServiceDetailScreenImageSubModal />
      )}

      {isBusinessNameModalVisibile && <BusinessNameModal />}

      {isContactDetailsModalVisibile && <ContactDetailsModal />}
      {isBusinessAddressToolsModalVisibile && <BusinessAddressToolsModal />}
      {isBusinessTimingsModalVisibile && <BusinessTimingsModal />}
      {isYearEstablishmentModalVisibile && <YearEstablishmentModal />}
      {isBusinesscategoriesModalVisibile && <BusinesscategoriesModal />}
      {isNumberofEmployeesModalVisibile && <NumberofEmployeesModal />}
      {isBusinessImagesModalVisibile && <BusinessImagesModal />}
      {isBusinessWebsiteModalVisibile && <BusinessWebsiteModal />}
      {isFollowSocialMediaModalVisibile && <FollowSocialMediaModal />}
      {isAddStoreModalVisibile && <AddStoreModal />}
      {isUpdateAddStoreModalVisibile && <UpdateAddStoreModal />}
      {isDeleteStoreModalVisibile && <DeleteStoreModal />}
      {/* {isVisitedModalVisibile && <VisitedModal />} */}

      {/* {isSelectLocationVisiteVisibile && <SelectLocationVisite/>} */}
      {isRegisterWithMobailNumberOtpVerifyVisibile && (
        <RegisterWithMobailNumberOtpVerify />
      )}
      {isBusinessVideoModalVisible && <BusinessVideoModal />}
      {isBusinessPorfileUpdateModal && <BusinessPorfileUpdateModal />}
      {isBusinessRebiewListModalVisible && <BusinessRebiewListModal />}
      {isCompleteBusinessModalVisible && <CompleteBusinessModal />}
      {isMessageSendModalVisible && <MessageSendModal />}
      {isVendorInfoModalVisible && <VendorInfoModal />}
      {isCampaignModalVisible && <CampaignModal />}
      {isPaymentsuccessfulVisile && <Paymentsuccessful />}
      {isStoresDetailModalVisibility && <StoresDetailModal />}
      {isServiceDetailScreenFiltterModalDetailVisibility && (
        <ServiceDetailScreenFiltterModalDetail />
      )}

      {isEditReviewModalVisibility && <EditReviewModal />}
      {isDeleteReviewModalVisibility && <DeleteReviewModal />}
      {isSponcerModalAfterAddVisibility && <SponcerModalAfterAdd />}
      {isImageModalMessageVisibility && (
        <ImageModalMessage selectedImage={null} />
      )}
      {isImageModalRightSideVisibility && (
        <ImageModalRightSide RightSideImage={null} />
      )}
      {isCheackStoreAddVisibility && <CheackStoreAdd />}
      {isCheackStoreandPlaneModalVisibility && <CheackStoreandPlaneModal />}
      {isViewAllRatingModalVisibility && <ViewAllRatingModal />}
      {isCheackUserNameSocailLOginVisibility && <CheackUserNameSocailLOgin />}

      {isPlaceExpireModalVisibility && <PlaceExpireModal />}
    </header>
  );
}

export default Header;
