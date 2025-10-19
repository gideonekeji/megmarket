import React from "react";

function CheakCurreny() {
  const planPrice = sessionStorage.getItem("planPrice");

  return <div>CheakCurreny</div>;
}

export default CheakCurreny;


countryCurrency = {
    "Afghanistan": {"code": "AFN", "currencyName": "Afghani", "symbol": "؋"},
    "Albania": {"code": "ALL", "currencyName": "Lek", "symbol": "L"},
    "Algeria": {"code": "DZD", "currencyName": "Algerian Dinar", "symbol": "د.ج"},
    "Andorra": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Angola": {"code": "AOA", "currencyName": "Kwanza", "symbol": "Kz"},
    "Argentina": {
      "code": "ARS",
      "currencyName": "Argentine Peso",
      "symbol": "\$"
    },
    "Armenia": {"code": "AMD", "currencyName": "Armenian Dram", "symbol": "֏"},
    "Australia": {
      "code": "AUD",
      "currencyName": "Australian Dollar",
      "symbol": "\$"
    },
    "Austria": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Azerbaijan": {
      "code": "AZN",
      "currencyName": "Azerbaijani Manat",
      "symbol": "₼"
    },
    "Bahamas": {"code": "BSD", "currencyName": "Bahamian Dollar", "symbol": "\$"},
    "Bahrain": {
      "code": "BHD",
      "currencyName": "Bahraini Dinar",
      "symbol": ".د.ب"
    },
    "Bangladesh": {"code": "BDT", "currencyName": "Taka", "symbol": "৳"},
    "Barbados": {
      "code": "BBD",
      "currencyName": "Barbadian Dollar",
      "symbol": "\$"
    },
    "Belarus": {
      "code": "BYN",
      "currencyName": "Belarusian Ruble",
      "symbol": "Br"
    },
    "Belgium": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Belize": {"code": "BZD", "currencyName": "Belize Dollar", "symbol": "\$"},
    "Benin": {"code": "XOF", "currencyName": "CFA Franc BCEAO", "symbol": "CFA"},
    "Bhutan": {"code": "BTN", "currencyName": "Ngultrum", "symbol": "Nu."},
    "Bolivia": {"code": "BOB", "currencyName": "Boliviano", "symbol": "Bs."},
    "Bosnia": {"code": "BAM", "currencyName": "Convertible Mark", "symbol": "KM"},
    "Botswana": {"code": "BWP", "currencyName": "Pula", "symbol": "P"},
    "Brazil": {"code": "BRL", "currencyName": "Brazilian Real", "symbol": "R\$"},
    "Brunei": {"code": "BND", "currencyName": "Brunei Dollar", "symbol": "\$"},
    "Bulgaria": {"code": "BGN", "currencyName": "Bulgarian Lev", "symbol": "лв"},
    "Burkina Faso": {
      "code": "XOF",
      "currencyName": "CFA Franc BCEAO",
      "symbol": "CFA"
    },
    "Burundi": {
      "code": "BIF",
      "currencyName": "Burundian Franc",
      "symbol": "FBu"
    },
    "Cambodia": {"code": "KHR", "currencyName": "Riel", "symbol": "៛"},
    "Cameroon": {
      "code": "XAF",
      "currencyName": "CFA Franc BEAC",
      "symbol": "CFA"
    },
    "Canada": {"code": "CAD", "currencyName": "Canadian Dollar", "symbol": "\$"},
    "Chile": {"code": "CLP", "currencyName": "Chilean Peso", "symbol": "\$"},
    "China": {"code": "CNY", "currencyName": "Chinese Yuan", "symbol": "¥"},
    "Colombia": {"code": "COP", "currencyName": "Colombian Peso", "symbol": "\$"},
    "Costa Rica": {
      "code": "CRC",
      "currencyName": "Costa Rican Colón",
      "symbol": "₡"
    },
    "Croatia": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Cuba": {"code": "CUP", "currencyName": "Cuban Peso", "symbol": "\$"},
    "Czechia": {"code": "CZK", "currencyName": "Czech Koruna", "symbol": "Kč"},
    "Denmark": {"code": "DKK", "currencyName": "Danish Krone", "symbol": "kr"},
    "Egypt": {"code": "EGP", "currencyName": "Egyptian Pound", "symbol": "E£"},
    "Ethiopia": {"code": "ETB", "currencyName": "Ethiopian Birr", "symbol": "Br"},
    "Fiji": {"code": "FJD", "currencyName": "Fijian Dollar", "symbol": "\$"},
    "France": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Germany": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Ghana": {"code": "GHS", "currencyName": "Ghanaian Cedi", "symbol": "GH₵"},
    "Greece": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Guatemala": {
      "code": "GTQ",
      "currencyName": "Guatemalan Quetzal",
      "symbol": "Q"
    },
    "Hong Kong": {
      "code": "HKD",
      "currencyName": "Hong Kong Dollar",
      "symbol": "\$"
    },
    "Hungary": {
      "code": "HUF",
      "currencyName": "Hungarian Forint",
      "symbol": "Ft"
    },
    "Iceland": {"code": "ISK", "currencyName": "Icelandic Krona", "symbol": "kr"},
    "India": {"code": "INR", "currencyName": "Indian Rupee", "symbol": "₹"},
    "Indonesia": {
      "code": "IDR",
      "currencyName": "Indonesian Rupiah",
      "symbol": "Rp"
    },
    "Iran": {"code": "IRR", "currencyName": "Iranian Rial", "symbol": "﷼"},
    "Iraq": {"code": "IQD", "currencyName": "Iraqi Dinar", "symbol": "د.ع"},
    "Israel": {"code": "ILS", "currencyName": "Israeli Shekel", "symbol": "₪"},
    "Italy": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Jamaica": {"code": "JMD", "currencyName": "Jamaican Dollar", "symbol": "\$"},
    "Japan": {"code": "JPY", "currencyName": "Japanese Yen", "symbol": "¥"},
    "Jordan": {"code": "JOD", "currencyName": "Jordanian Dinar", "symbol": "د.ا"},
    "Kazakhstan": {
      "code": "KZT",
      "currencyName": "Kazakhstani Tenge",
      "symbol": "₸"
    },
    "Kenya": {"code": "KES", "currencyName": "Kenyan Shilling", "symbol": "KSh"},
    "Kuwait": {"code": "KES", "currencyName": "Kuwaiti Dinar", "symbol": "د.ك"},
    "Laos": {"code": "LAK", "currencyName": "Lao Kip", "symbol": "₭"},
    "Latvia": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Lebanon": {"code": "LBP", "currencyName": "Lebanese Pound", "symbol": "ل.ل"},
    "Malaysia": {
      "code": "MYR",
      "currencyName": "Malaysian Ringgit",
      "symbol": "RM"
    },
    "Mexico": {"code": "MXN", "currencyName": "Mexican Peso", "symbol": "\$"},
    "Morocco": {
      "code": "MAD",
      "currencyName": "Moroccan Dirham",
      "symbol": "د.م."
    },
    "Myanmar": {"code": "MMK", "currencyName": "Burmese Kyat", "symbol": "Ks"},
    "Namibia": {"code": "NAD", "currencyName": "Namibian Dollar", "symbol": "Ks"},
    "Nepal": {"code": "NPR", "currencyName": "Nepalese Rupee", "symbol": "रु"},
    "Netherlands": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "New Zealand": {
      "code": "NZD",
      "currencyName": "New Zealand Dollar",
      "symbol": "\$"
    },
    "Nigeria": {"code": "NGN", "currencyName": "Nigerian Naira", "symbol": "₦"},
    "North Korea": {
      "code": "KPW",
      "currencyName": "North Korean Won",
      "symbol": "₩"
    },
    "Norway": {"code": "NOK", "currencyName": "Norwegian Krone", "symbol": "kr"},
    "Oman": {"code": "OMR", "currencyName": "Omani Rial", "symbol": "	﷼"},
    "Pakistan": {"code": "PKR", "currencyName": "Pakistani Rupee", "symbol": "₨"},
    "Philippines": {
      "code": "PHP",
      "currencyName": "Philippine Peso",
      "symbol": "₱"
    },
    "Poland": {"code": "PLN", "currencyName": "Polish Złoty", "symbol": "zł"},
    "Portugal": {"code": "EUR", "currencyName": "Euro", "symbol": "€"},
    "Qatar": {"code": "QAR", "currencyName": "Qatari Riyal", "symbol": "	﷼"},
    "Romania": {"code": "RON", "currencyName": "Romanian Leu", "symbol": "lei"},
    "Russia": {"code": "RUB", "currencyName": "Russian Ruble", "symbol": "₽"},
    "Saudi Arabia": {"code": "SAR", "currencyName": "Saudi Riyal", "symbol": "﷼"},
    "Serbia": {"code": "RSD", "currencyName": "Serbian Dinar", "symbol": "дин."},
    "Singapore": {
      "code": "SGD",
      "currencyName": "Singapore Dollar",
      "symbol": "\$"
    },
    "South Africa": {
      "code": "ZAR",
      "currencyName": "South African Rand",
      "symbol": "R"
    },
    "South Korea": {
      "code": "KRW",
      "currencyName": "South Korean Won",
      "symbol": "₩"
    },
    "Spain": {"code": "EUR", "currencyName": "South Korean Won", "symbol": "€"},
    "Sri Lanka": {
      "code": "LKR",
      "currencyName": "Sri Lankan Rupee",
      "symbol": "Rs"
    },
    "Sudan": {"code": "SDG", "currencyName": "Sudanese Pound", "symbol": "ج.س."},
    "Sweden": {"code": "SEK", "currencyName": "Euro", "symbol": "kr"},
    "Switzerland": {"code": "CHF", "currencyName": "Swiss Franc", "symbol": "Fr"},
    "Syria": {"code": "SYP", "currencyName": "Syrian Pound", "symbol": "£S"},
    "Taiwan": {
      "code": "TWD",
      "currencyName": "New Taiwan Dollar",
      "symbol": "NT\$"
    },
    "Thailand": {"code": "THB", "currencyName": "Thai Baht", "symbol": "฿"},
    "Turkey": {"code": "TRY", "currencyName": "Turkish Lira", "symbol": "₺"},
    "Ukraine": {
      "code": "UAH",
      "currencyName": "Ukrainian Hryvnia",
      "symbol": "₴"
    },
    "United Arab Emirates": {
      "code": "AED",
      "currencyName": "UAE Dirham",
      "symbol": "د.إ"
    },
    "United Kingdom": {
      "code": "GBP",
      "currencyName": "British Pound",
      "symbol": "£"
    },
    "United States": {"code": "USD", "currencyName": "US Dollar", "symbol": "\$"},
    "Uruguay": {"code": "UYU", "currencyName": "Uruguayan Peso", "symbol": "\$U"},
    "Uzbekistan": {
      "code": "UZS",
      "currencyName": "Uzbekistani Som",
      "symbol": "soʻm"
    },
    "Venezuela": {
      "code": "VES",
      "currencyName": "Venezuelan Bolívar",
      "symbol": "Bs."
    },
    "Vietnam": {"code": "VND", "currencyName": "Vietnamese Dong", "symbol": "₫"},
    "Yemen": {"code": "YER", "currencyName": "Yemeni Rial", "symbol": "﷼"},
    "Zambia": {"code": "ZMW", "currencyName": "Zambian Kwacha", "symbol": "ZK"}
  };