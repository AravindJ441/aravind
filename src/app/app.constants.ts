import * as moment from "moment";

export const PLATFORM_URL_SEGMENT = {
  'fb': 'facebook',
  'twitter': 'twitter',
  'insta': 'instagram',
  'iStore': 'app_store',
  'pStore': 'play_store',
}

export const getDisplayDate = dateString => {
  return moment(dateString, `YYYY-MM-DDTHH:mm:ss.SSSZ`).format(`Do MMM YYYY HH:mm`);
}

export const PLATFORM_LIST = [
  {'key': '', 'value': 'All'},
  {'key': 'appstore', 'value': 'App Store'},
  {'key': 'facebook', 'value': 'Facebook'},
  {'key': 'instagram', 'value': 'Instagram'},
  {'key': 'playstore', 'value': 'Play Store'},
  {'key': 'twitter', 'value': 'Twitter'},
];


export const PLATFORM_DISP_NAME = {
  'PLAYSTORE': 'Play Store',
  'APPSTORE': 'App Store',
  'FACEBOOK': 'Facebook',
  'TWITTER': 'Twitter',
  'INSTAGRAM': 'Instagram',
}

export const PLATFORM_NAME_REV_MAP = {
  'Play Store': 'playstore',
  'App Store': 'appstore',
  'Facebook': 'facebook',
  'Twitter': 'twitter',
  'Instagram': 'instagram',
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "DD-MMMM-YYYY",
  },
  display: {
    dateInput: "DD-MMMM-YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

export const ADMIN_SUGGESTION = ["APPRECIATION", "SUGGESTION", "COMPLAINT"];
export const INVALID_TOKEN = 'Invalid token';

export const SUGGESTION_LIST = [
  {'key': '', 'value': 'All'},
  {'key': 'appreciation', 'value': 'Appreciation'},
  {'key': 'complaint', 'value': 'Complaint'},
  {'key': 'suggestion', 'value': 'Suggestion'},
];

export const COUNTRY_LIST = [
  {
    "value": "AF",
    "display": "Afghanistan"
  },
  {
    "value": "AX",
    "display": "Åland Islands"
  },
  {
    "value": "AL",
    "display": "Albania"
  },
  {
    "value": "DZ",
    "display": "Algeria"
  },
  {
    "value": "AS",
    "display": "American Samoa"
  },
  {
    "value": "AD",
    "display": "Andorra"
  },
  {
    "value": "AO",
    "display": "Angola"
  },
  {
    "value": "AI",
    "display": "Anguilla"
  },
  {
    "value": "AQ",
    "display": "Antarctica"
  },
  {
    "value": "AG",
    "display": "Antigua and Barbuda"
  },
  {
    "value": "AR",
    "display": "Argentina"
  },
  {
    "value": "AM",
    "display": "Armenia"
  },
  {
    "value": "AW",
    "display": "Aruba"
  },
  {
    "value": "AU",
    "display": "Australia"
  },
  {
    "value": "AT",
    "display": "Austria"
  },
  {
    "value": "AZ",
    "display": "Azerbaijan"
  },
  {
    "value": "BS",
    "display": "Bahamas"
  },
  {
    "value": "BH",
    "display": "Bahrain"
  },
  {
    "value": "BD",
    "display": "Bangladesh"
  },
  {
    "value": "BB",
    "display": "Barbados"
  },
  {
    "value": "BY",
    "display": "Belarus"
  },
  {
    "value": "BE",
    "display": "Belgium"
  },
  {
    "value": "BZ",
    "display": "Belize"
  },
  {
    "value": "BJ",
    "display": "Benin"
  },
  {
    "value": "BM",
    "display": "Bermuda"
  },
  {
    "value": "BT",
    "display": "Bhutan"
  },
  {
    "value": "BO",
    "display": "Bolivia, Plurinational State of"
  },
  {
    "value": "BQ",
    "display": "Bonaire, Sint Eustatius and Saba"
  },
  {
    "value": "BA",
    "display": "Bosnia and Herzegovina"
  },
  {
    "value": "BW",
    "display": "Botswana"
  },
  {
    "value": "BV",
    "display": "Bouvet Island"
  },
  {
    "value": "BR",
    "display": "Brazil"
  },
  {
    "value": "IO",
    "display": "British Indian Ocean Territory"
  },
  {
    "value": "BN",
    "display": "Brunei Darussalam"
  },
  {
    "value": "BG",
    "display": "Bulgaria"
  },
  {
    "value": "BF",
    "display": "Burkina Faso"
  },
  {
    "value": "BI",
    "display": "Burundi"
  },
  {
    "value": "KH",
    "display": "Cambodia"
  },
  {
    "value": "CM",
    "display": "Cameroon"
  },
  {
    "value": "CA",
    "display": "Canada"
  },
  {
    "value": "CV",
    "display": "Cape Verde"
  },
  {
    "value": "KY",
    "display": "Cayman Islands"
  },
  {
    "value": "CF",
    "display": "Central African Republic"
  },
  {
    "value": "TD",
    "display": "Chad"
  },
  {
    "value": "CL",
    "display": "Chile"
  },
  {
    "value": "CN",
    "display": "China"
  },
  {
    "value": "CX",
    "display": "Christmas Island"
  },
  {
    "value": "CC",
    "display": "Cocos (Keeling) Islands"
  },
  {
    "value": "CO",
    "display": "Colombia"
  },
  {
    "value": "KM",
    "display": "Comoros"
  },
  {
    "value": "CG",
    "display": "Congo"
  },
  {
    "value": "CD",
    "display": "Congo, the Democratic Republic of the"
  },
  {
    "value": "CK",
    "display": "Cook Islands"
  },
  {
    "value": "CR",
    "display": "Costa Rica"
  },
  {
    "value": "CI",
    "display": "Côte d'Ivoire"
  },
  {
    "value": "HR",
    "display": "Croatia"
  },
  {
    "value": "CU",
    "display": "Cuba"
  },
  {
    "value": "CW",
    "display": "Curaçao"
  },
  {
    "value": "CY",
    "display": "Cyprus"
  },
  {
    "value": "CZ",
    "display": "Czech Republic"
  },
  {
    "value": "DK",
    "display": "Denmark"
  },
  {
    "value": "DJ",
    "display": "Djibouti"
  },
  {
    "value": "DM",
    "display": "Dominica"
  },
  {
    "value": "DO",
    "display": "Dominican Republic"
  },
  {
    "value": "EC",
    "display": "Ecuador"
  },
  {
    "value": "EG",
    "display": "Egypt"
  },
  {
    "value": "SV",
    "display": "El Salvador"
  },
  {
    "value": "GQ",
    "display": "Equatorial Guinea"
  },
  {
    "value": "ER",
    "display": "Eritrea"
  },
  {
    "value": "EE",
    "display": "Estonia"
  },
  {
    "value": "ET",
    "display": "Ethiopia"
  },
  {
    "value": "FK",
    "display": "Falkland Islands (Malvinas)"
  },
  {
    "value": "FO",
    "display": "Faroe Islands"
  },
  {
    "value": "FJ",
    "display": "Fiji"
  },
  {
    "value": "FI",
    "display": "Finland"
  },
  {
    "value": "FR",
    "display": "France"
  },
  {
    "value": "GF",
    "display": "French Guiana"
  },
  {
    "value": "PF",
    "display": "French Polynesia"
  },
  {
    "value": "TF",
    "display": "French Southern Territories"
  },
  {
    "value": "GA",
    "display": "Gabon"
  },
  {
    "value": "GM",
    "display": "Gambia"
  },
  {
    "value": "GE",
    "display": "Georgia"
  },
  {
    "value": "DE",
    "display": "Germany"
  },
  {
    "value": "GH",
    "display": "Ghana"
  },
  {
    "value": "GI",
    "display": "Gibraltar"
  },
  {
    "value": "GR",
    "display": "Greece"
  },
  {
    "value": "GL",
    "display": "Greenland"
  },
  {
    "value": "GD",
    "display": "Grenada"
  },
  {
    "value": "GP",
    "display": "Guadeloupe"
  },
  {
    "value": "GU",
    "display": "Guam"
  },
  {
    "value": "GT",
    "display": "Guatemala"
  },
  {
    "value": "GG",
    "display": "Guernsey"
  },
  {
    "value": "GN",
    "display": "Guinea"
  },
  {
    "value": "GW",
    "display": "Guinea-Bissau"
  },
  {
    "value": "GY",
    "display": "Guyana"
  },
  {
    "value": "HT",
    "display": "Haiti"
  },
  {
    "value": "HM",
    "display": "Heard Island and McDonald Islands"
  },
  {
    "value": "VA",
    "display": "Holy See (Vatican City State)"
  },
  {
    "value": "HN",
    "display": "Honduras"
  },
  {
    "value": "HK",
    "display": "Hong Kong"
  },
  {
    "value": "HU",
    "display": "Hungary"
  },
  {
    "value": "IS",
    "display": "Iceland"
  },
  {
    "value": "IN",
    "display": "India"
  },
  {
    "value": "ID",
    "display": "Indonesia"
  },
  {
    "value": "IR",
    "display": "Iran, Islamic Republic of"
  },
  {
    "value": "IQ",
    "display": "Iraq"
  },
  {
    "value": "IE",
    "display": "Ireland"
  },
  {
    "value": "IM",
    "display": "Isle of Man"
  },
  {
    "value": "IL",
    "display": "Israel"
  },
  {
    "value": "IT",
    "display": "Italy"
  },
  {
    "value": "JM",
    "display": "Jamaica"
  },
  {
    "value": "JP",
    "display": "Japan"
  },
  {
    "value": "JE",
    "display": "Jersey"
  },
  {
    "value": "JO",
    "display": "Jordan"
  },
  {
    "value": "KZ",
    "display": "Kazakhstan"
  },
  {
    "value": "KE",
    "display": "Kenya"
  },
  {
    "value": "KI",
    "display": "Kiribati"
  },
  {
    "value": "KP",
    "display": "Korea, Democratic People's Republic of"
  },
  {
    "value": "KR",
    "display": "Korea, Republic of"
  },
  {
    "value": "KW",
    "display": "Kuwait"
  },
  {
    "value": "KG",
    "display": "Kyrgyzstan"
  },
  {
    "value": "LA",
    "display": "Lao People's Democratic Republic"
  },
  {
    "value": "LV",
    "display": "Latvia"
  },
  {
    "value": "LB",
    "display": "Lebanon"
  },
  {
    "value": "LS",
    "display": "Lesotho"
  },
  {
    "value": "LR",
    "display": "Liberia"
  },
  {
    "value": "LY",
    "display": "Libya"
  },
  {
    "value": "LI",
    "display": "Liechtenstein"
  },
  {
    "value": "LT",
    "display": "Lithuania"
  },
  {
    "value": "LU",
    "display": "Luxembourg"
  },
  {
    "value": "MO",
    "display": "Macao"
  },
  {
    "value": "MK",
    "display": "Macedonia, the Former Yugoslav Republic of"
  },
  {
    "value": "MG",
    "display": "Madagascar"
  },
  {
    "value": "MW",
    "display": "Malawi"
  },
  {
    "value": "MY",
    "display": "Malaysia"
  },
  {
    "value": "MV",
    "display": "Maldives"
  },
  {
    "value": "ML",
    "display": "Mali"
  },
  {
    "value": "MT",
    "display": "Malta"
  },
  {
    "value": "MH",
    "display": "Marshall Islands"
  },
  {
    "value": "MQ",
    "display": "Martinique"
  },
  {
    "value": "MR",
    "display": "Mauritania"
  },
  {
    "value": "MU",
    "display": "Mauritius"
  },
  {
    "value": "YT",
    "display": "Mayotte"
  },
  {
    "value": "MX",
    "display": "Mexico"
  },
  {
    "value": "FM",
    "display": "Micronesia, Federated States of"
  },
  {
    "value": "MD",
    "display": "Moldova, Republic of"
  },
  {
    "value": "MC",
    "display": "Monaco"
  },
  {
    "value": "MN",
    "display": "Mongolia"
  },
  {
    "value": "ME",
    "display": "Montenegro"
  },
  {
    "value": "MS",
    "display": "Montserrat"
  },
  {
    "value": "MA",
    "display": "Morocco"
  },
  {
    "value": "MZ",
    "display": "Mozambique"
  },
  {
    "value": "MM",
    "display": "Myanmar"
  },
  {
    "value": "NA",
    "display": "Namibia"
  },
  {
    "value": "NR",
    "display": "Nauru"
  },
  {
    "value": "NP",
    "display": "Nepal"
  },
  {
    "value": "NL",
    "display": "Netherlands"
  },
  {
    "value": "NC",
    "display": "New Caledonia"
  },
  {
    "value": "NZ",
    "display": "New Zealand"
  },
  {
    "value": "NI",
    "display": "Nicaragua"
  },
  {
    "value": "NE",
    "display": "Niger"
  },
  {
    "value": "NG",
    "display": "Nigeria"
  },
  {
    "value": "NU",
    "display": "Niue"
  },
  {
    "value": "NF",
    "display": "Norfolk Island"
  },
  {
    "value": "MP",
    "display": "Northern Mariana Islands"
  },
  {
    "value": "NO",
    "display": "Norway"
  },
  {
    "value": "OM",
    "display": "Oman"
  },
  {
    "value": "PK",
    "display": "Pakistan"
  },
  {
    "value": "PW",
    "display": "Palau"
  },
  {
    "value": "PS",
    "display": "Palestine, State of"
  },
  {
    "value": "PA",
    "display": "Panama"
  },
  {
    "value": "PG",
    "display": "Papua New Guinea"
  },
  {
    "value": "PY",
    "display": "Paraguay"
  },
  {
    "value": "PE",
    "display": "Peru"
  },
  {
    "value": "PH",
    "display": "Philippines"
  },
  {
    "value": "PN",
    "display": "Pitcairn"
  },
  {
    "value": "PL",
    "display": "Poland"
  },
  {
    "value": "PT",
    "display": "Portugal"
  },
  {
    "value": "PR",
    "display": "Puerto Rico"
  },
  {
    "value": "QA",
    "display": "Qatar"
  },
  {
    "value": "RE",
    "display": "Réunion"
  },
  {
    "value": "RO",
    "display": "Romania"
  },
  {
    "value": "RU",
    "display": "Russian Federation"
  },
  {
    "value": "RW",
    "display": "Rwanda"
  },
  {
    "value": "BL",
    "display": "Saint Barthélemy"
  },
  {
    "value": "SH",
    "display": "Saint Helena, Ascension and Tristan da Cunha"
  },
  {
    "value": "KN",
    "display": "Saint Kitts and Nevis"
  },
  {
    "value": "LC",
    "display": "Saint Lucia"
  },
  {
    "value": "MF",
    "display": "Saint Martin (French part)"
  },
  {
    "value": "PM",
    "display": "Saint Pierre and Miquelon"
  },
  {
    "value": "VC",
    "display": "Saint Vincent and the Grenadines"
  },
  {
    "value": "WS",
    "display": "Samoa"
  },
  {
    "value": "SM",
    "display": "San Marino"
  },
  {
    "value": "ST",
    "display": "Sao Tome and Principe"
  },
  {
    "value": "SA",
    "display": "Saudi Arabia"
  },
  {
    "value": "SN",
    "display": "Senegal"
  },
  {
    "value": "RS",
    "display": "Serbia"
  },
  {
    "value": "SC",
    "display": "Seychelles"
  },
  {
    "value": "SL",
    "display": "Sierra Leone"
  },
  {
    "value": "SG",
    "display": "Singapore"
  },
  {
    "value": "SX",
    "display": "Sint Maarten (Dutch part)"
  },
  {
    "value": "SK",
    "display": "Slovakia"
  },
  {
    "value": "SI",
    "display": "Slovenia"
  },
  {
    "value": "SB",
    "display": "Solomon Islands"
  },
  {
    "value": "SO",
    "display": "Somalia"
  },
  {
    "value": "ZA",
    "display": "South Africa"
  },
  {
    "value": "GS",
    "display": "South Georgia and the South Sandwich Islands"
  },
  {
    "value": "SS",
    "display": "South Sudan"
  },
  {
    "value": "ES",
    "display": "Spain"
  },
  {
    "value": "LK",
    "display": "Sri Lanka"
  },
  {
    "value": "SD",
    "display": "Sudan"
  },
  {
    "value": "SR",
    "display": "Suriname"
  },
  {
    "value": "SJ",
    "display": "Svalbard and Jan Mayen"
  },
  {
    "value": "SZ",
    "display": "Swaziland"
  },
  {
    "value": "SE",
    "display": "Sweden"
  },
  {
    "value": "CH",
    "display": "Switzerland"
  },
  {
    "value": "SY",
    "display": "Syrian Arab Republic"
  },
  {
    "value": "TW",
    "display": "Taiwan, Province of China"
  },
  {
    "value": "TJ",
    "display": "Tajikistan"
  },
  {
    "value": "TZ",
    "display": "Tanzania, United Republic of"
  },
  {
    "value": "TH",
    "display": "Thailand"
  },
  {
    "value": "TL",
    "display": "Timor-Leste"
  },
  {
    "value": "TG",
    "display": "Togo"
  },
  {
    "value": "TK",
    "display": "Tokelau"
  },
  {
    "value": "TO",
    "display": "Tonga"
  },
  {
    "value": "TT",
    "display": "Trinidad and Tobago"
  },
  {
    "value": "TN",
    "display": "Tunisia"
  },
  {
    "value": "TR",
    "display": "Turkey"
  },
  {
    "value": "TM",
    "display": "Turkmenistan"
  },
  {
    "value": "TC",
    "display": "Turks and Caicos Islands"
  },
  {
    "value": "TV",
    "display": "Tuvalu"
  },
  {
    "value": "UG",
    "display": "Uganda"
  },
  {
    "value": "UA",
    "display": "Ukraine"
  },
  {
    "value": "AE",
    "display": "United Arab Emirates"
  },
  {
    "value": "GB",
    "display": "United Kingdom"
  },
  {
    "value": "US",
    "display": "United States"
  },
  {
    "value": "UM",
    "display": "United States Minor Outlying Islands"
  },
  {
    "value": "UY",
    "display": "Uruguay"
  },
  {
    "value": "UZ",
    "display": "Uzbekistan"
  },
  {
    "value": "VU",
    "display": "Vanuatu"
  },
  {
    "value": "VE",
    "display": "Venezuela, Bolivarian Republic of"
  },
  {
    "value": "VN",
    "display": "Viet Nam"
  },
  {
    "value": "VG",
    "display": "Virgin Islands, British"
  },
  {
    "value": "VI",
    "display": "Virgin Islands, U.S."
  },
  {
    "value": "WF",
    "display": "Wallis and Futuna"
  },
  {
    "value": "EH",
    "display": "Western Sahara"
  },
  {
    "value": "YE",
    "display": "Yemen"
  },
  {
    "value": "ZM",
    "display": "Zambia"
  },
  {
    "value": "ZW",
    "display": "Zimbabwe"
  }
];