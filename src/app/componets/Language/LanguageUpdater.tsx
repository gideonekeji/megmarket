import { useEffect } from "react";
import { useMutation } from "react-query";
import axios from "axios";

export const useAddLangKey = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

  return useMutation(async (payload: { key: string; value: string }) => {
    const response = await axios.post(`${baseURL}/addKey`, payload);
    return response.data;
  });
};

const languageKeys = {
  "Explore More": "Explore More",
  "Search Your Services": "Search Your Services",
  "Location": "Location",
  "Search": "Search",
  "Search for Category or Service": "Search for Category or Service",
  "Search Location": "Search Location",
  "Stay connected with us for the latest updates and exciting news!":
    "Stay connected with us for the latest updates and exciting news!",
  "Your Email Address": "Your Email Address",
  "Submit": "Submit",
  "Use Links": "Use Links",
  "Categories": "Categories",
  "Home": "Home",
  "Subcategory": "Subcategory",
  "Pricing Filter": "Pricing Filter",
  "Rating": "Rating",
  "Stores": "Stores",
  "Vendor Information": "Vendor Information",
  "Member since": "Member Since",
  "Number of Employees": "Number of Employees",
  "Visit Website": "Visit Website",
  "Email on": "Email On",
  "Reviews & Ratings": "Reviews & Ratings",
  "No Data Found": "No Data Found",
  "Ratings": "Ratings",
  "Business Hours": "Business Hours",
  "Video": "Video",
  "Find deals in": "Find Deals In",
  "Nearby Store": "Nearby Store",
  "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change.":
    "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change.",
  "15 Years Of Service": "15 Years of Service",
  "Value": "Value",
  "Core Values": "Core Values",
  "Community Responsiveness": "Community Responsiveness",
  "Integrity": "Integrity",
  "Team Work": "Teamwork",
  "Effort": "Effort",
  "Integrity Growth": "Integrity Growth",
  "Vision and Values into action": "Vision and Values into Action",
  "Our Mission": "Our Mission",
  "We are dedicated to delivering innovative solutions.":
    "We are dedicated to delivering innovative solutions.",
  "About Us": "About Us",
  "Store": "Store",
  "Contact Us": "Contact Us",
  "Privacy Policy": "Privacy Policy",
  "Terms & Conditions": "Terms & Conditions",
  "FAQ": "FAQ",
  "Subscribe": "Subscribe",
  "Add Store": "Add Store",
  "Reach out to us with your questions or requests. We are here to assist you!":
    "Reach out to us with your questions or requests. We are here to assist you!",
  "Call Us": "Call Us",
  "Email Us": "Email Us",
  "Address": "Address",
  "List Your Business": "List Your Business",
  "Our Pricing Plan": "Our Pricing Plan",
  "Affordable Price Packages": "Affordable Price Packages",
  "Increase Business Profile Score": "Increase Business Profile Score",
  "Reach Out to More Customers": "Reach Out to More Customers",
  "Grow Your": "Grow Your",
  "Business": "Business",
  "Get Started": "Get Started",
  "Business By Boosting": "Business by Boosting",
  "You haven’t subscribed to be a Vendor":
    "You haven’t subscribed to be a vendor.",
  "First, subscribe to become a vendor and create your store.":
    "First, subscribe to become a vendor and create your store.",
  "My": "My",
  "Favorite": "Favorite",
  "Your Business": "Your Business",
  "Quick Links: Your Gateway to Essential Resources":
    "Quick Links: Your Gateway to Essential Resources",
  "Add": "Add",
  "Photos": "Photos",
  "Contact": "Contact",
  "Timings": "Timings",
  "Add Social": "Add Social",
  "Links": "Links",
  "Follow on Social Media": "Follow on Social Media",
  "Enter the address details that would be used by customers to locate your workplace":
    "Enter the address details that would be used by customers to locate your workplace",
  "Make your business look more trustworthy by uploding images and videos of your business premises":
    "Make your business look more trustworthy by uploding images and videos of your business premises",
  "Business images": "Business images",
  "Service Image/Video": "Service Image/Video",
  "Click to upload": "Click to upload",
  "save": "save",
  "Contact Details": "Contact Details",
  "Update your contact details to stay in touch with your customers in real time":
    "Update your contact details to stay in touch with your customers in real time",
  "Mobile Number": "Mobile Number",
  "Let your customers know when to reach you. You can also configure dual timing slots in a single day.":
    "Let your customers know when to reach you. You can also configure dual timing slots in a single day.",
  "Business Timings": "Business Timings",
  "Business Opening Hours": "Business Opening Hours",
  "Mon": "Mon",
  "Tue": "Tue",
  "Wed": "Wed",
  "Thu": "Thu",
  "Fri": "Fri",
  "Sat": "Sat",
  "Sun": "Sun",
  "Select the multiple days you want to provide the service to the users":
    "Select the multiple days you want to provide the service to the users",
  "Start Time": "Start Time",
  "Select Days of the Week": "Select Days of the Week",
  "Store": "Store",
  "Business Website": "Business Website",

  "Add Business Website": "Add Business Website",
  "Business Video Url": "Business Video Url",
 
  "Enter Video URL": "Enter Video URL",
  "Please provide the URL of your business website so customers can reach you.":
    "Please provide the URL of your business website so customers can reach you.",
  "Business Tools": "Business Tools",
  "Manage Offers, Reviews and more": "Manage Offers, Reviews and more",
  "Follow Us": "Follow Us",
  "Business Name": "Business Name",

  "Business Address": "Business Address",
  "Complete Address": "Complete Address",
  "Address": "Address",
  "House No": "House No",
  "Building": "Building",
  "Street": "Street",
  "Area": "Area",
  "City": "City",
  "State": "State",
  "Save Address": "Save Address",
  "Business Timings": "Business Timings",
  "Let your customers know when to reach you. You can also configure dual timing slots in a single day.":
    "Let your customers know when to reach you. You can also configure dual timing slots in a single day.",
  "Year of Establishment": "Year of Establishment",
  "Please note that any changes to the details below can go for verification and take upto 2 working days to go live":
    "Please note that any changes to the details below can go for verification and take upto 2 working days to go live",
  "Month": "Month",
  "Year": "Year",
  "Number of Employees": "Number of Employees",
  "Please select the number of employees at your company":
    "Please select the number of employees at your company",
  "Less than 10": "Less than 10",
  "More than 10000": "More than 10000",
  "Business Images": "Business Images",
  "Make your business look more trustworthy by uploding images and videos of your business premises":
    "Make your business look more trustworthy by uploding images and videos of your business premises",
  "Business images": "Business images",
  "Business Website": "Business Website",
  "Add Business Website": "Add Business Website",
  "Enter the address details that would be used by customers to locate your workplace":
    "Enter the address details that would be used by customers to locate your workplace",
  "Business Website": "Business Website",
  "Follow on Social Media": "Follow on Social Media",
  "Business Video Url": "Business Video Url",
  "Enter the address details that would be used by customers to locate your workplace":
    "Enter the address details that would be used by customers to locate your workplace",
  "Enter Video URL": "Enter Video URL",
  "Services": "Services",
  "Add Services, List, and Edit it": "Add Services, List, and Edit it",
  "All": "All",
  "Services": "Services",
  "Add Service": "Add Service",
  "Add Service Images": "Add Service Images",
  "Service Name": "Service Name",
  "Sub-Categories": "Sub-Categories",
  "Business Description": "Business Description",
  "Price": "Price",
  "Service Cover image": "Service Cover image",
  "Update store": "Update store",
  "Update Service Images": "Update Service Images",
  "Service Name": "Service Name",
  "Sub-Categories": "Sub-Categories",
  "Business Description": "Business Description",
  "Service Cover image": "Service Cover image",
  "Services Delete": "Services Delete",
  "Are you sure you want to delete this store?":
    "Are you sure you want to delete this store?",
  "Cancel": "Cancel",
  "Delete": "Delete",
  "Payment History": "Payment History",
  "See all the sponsored payment history":
    "See all the sponsored payment history",
  "Subscription Payment History": "Subscription Payment History",
  "Campaign Payment History": "Campaign Payment History",
  "Support": "Support",
  "Connect with Us": "Connect with Us",
  "Customer Support": "Customer Support",
  "Message": "Message",
  "Business Name": "Business Name",
  "Service Cover image": "Service Cover image",
  "Business Description": "Business Description",
  "Store Image/Video": "Store Image/Video",
  "Business Address": "Business Address",
  "Category": "Category",
  "Subcategory": "Subcategory",
  "Next Step":"Next Step",
  "Follow Us on":"Follow Us on",
  "Twitter":"Twitter",
  "Instagram":"Instagram",
  "Facebook":"Facebook",
  "Whats app":"Whats app",
  "Previous":"Previous",
  "Meta Title":"Meta Title",
  "Meta Description":"Meta Description",
  "Closed":"Closed",
  "My Account":"My Account",
  "My business":"My Business",
  "Are you sure you want to Logout ?":"Are you sure you want to Logout ?",
  "Logout":"Logout",
  "Discover more about our app by registering or logging in.":"Discover more about our app by registering or logging in.",
  "Remember me":"Remember me",
  "Forgot Password?":"Forgot Password?",
  "Continue with Google":"Continue with Google",
  "Continue with Number":"Continue with Number",
  "Don't have an account?":"Don't have an account?",
  "Get Otp":"Get Otp",
  "Username":"Username",
  "Password":"Password",
  "Until": "Until",
  "Message": "Message",
  "WhatsApp": "WhatsApp",
  "Store Description": "Store Description",
  "Photos": "Photos",
  "Start Your Review": "Start Your Review",
  "All Rating": "All Rating",
  "Show Number": "Show Number",
  "Number of Employees": "Number of Employees",
  "Map": "Map",
  "Sponsor":"Sponsor",
  "Number of Employees:":"Number of Employees:",
  "Overview":"Overview",
  "Number of Favorites":"Number of Favorites",
  "Leads Received":"Leads Received",
  "Number of Users Visits Daily":"Number of Users Visits Daily",
  "Your Store has been sponsored":"Your Store has been sponsored"
};

const LanguageUpdater = () => {
  const addLangKey = useAddLangKey();

  // useEffect(() => {
  //   Object.entries(languageKeys).forEach(([key, value]) => {
  //     addLangKey.mutate({ key, value });
  //   });
  // }, []);

  return null; // No UI needed, just triggering API calls
};

export default LanguageUpdater;
