import serviceRecords from "@/data/services.json" with { type: "json" };
import privateServiceRecords from "@/data/services-private-extended.json" with { type: "json" };
import type { Agency, Service, VerificationStatus } from "@/lib/types";
import { validateServiceCatalog } from "@/lib/service-records";

export const agencies: Agency[] = [
  {
    "slug": "nigeria-embassy-netherlands",
    "name": "Embassy of Nigeria, The Netherlands",
    "shortName": "Nigeria Embassy The Hague",
    "description": "Consular services for Nigerians and visa applicants in the Netherlands.",
    "website": "https://nigerianembassythehague.nl/"
  },
  {
    "slug": "nis",
    "name": "Nigeria Immigration Service",
    "shortName": "NIS",
    "description": "Passport and immigration services.",
    "website": "https://immigration.gov.ng"
  },
  {
    "slug": "nimc",
    "name": "National Identity Management Commission",
    "shortName": "NIMC",
    "description": "National Identification Number enrolment and modification services.",
    "website": "https://nimc.gov.ng"
  },
  {
    "slug": "cbn",
    "name": "Central Bank of Nigeria",
    "shortName": "CBN",
    "description": "Banking identity, payments-system and regulated financial-service guidance.",
    "website": "https://www.cbn.gov.ng"
  },
  {
    "slug": "sec",
    "name": "Securities and Exchange Commission Nigeria",
    "shortName": "SEC",
    "description": "Investor protection, capital-market regulation, unclaimed-dividend and e-Dividend services.",
    "website": "https://sec.gov.ng"
  },
  {
    "slug": "nibss",
    "name": "Nigeria Inter-Bank Settlement System",
    "shortName": "NIBSS",
    "description": "Inter-bank payment infrastructure, BVN services and official 565 USSD validation utilities.",
    "website": "https://nibss-plc.com.ng"
  },
  {
    "slug": "fmoh",
    "name": "Federal Ministry of Health and Social Welfare",
    "shortName": "FMoH",
    "description": "Port Health and public-health services connected to international travel.",
    "website": "https://health.gov.ng"
  },
  {
    "slug": "npf",
    "name": "Nigeria Police Force",
    "shortName": "NPF",
    "description": "Police specialised services, certificates and official verification routes.",
    "website": "https://www.npf.gov.ng"
  },
  {
    "slug": "inec",
    "name": "Independent National Electoral Commission",
    "shortName": "INEC",
    "description": "Voter registration records, PVC status and official collection information.",
    "website": "https://inecnigeria.org"
  },
  {
    "slug": "frsc",
    "name": "Federal Road Safety Corps",
    "shortName": "FRSC",
    "description": "Nigeria driver's licence services and road-safety processes.",
    "website": "https://frsc.gov.ng"
  },
  {
    "slug": "cac",
    "name": "Corporate Affairs Commission",
    "shortName": "CAC",
    "description": "Business names, companies, incorporated trustees and corporate compliance.",
    "website": "https://www.cac.gov.ng"
  },
  {
    "slug": "jamb",
    "name": "Joint Admissions and Matriculation Board",
    "shortName": "JAMB",
    "description": "UTME, Direct Entry, CAPS and admission services.",
    "website": "https://www.jamb.gov.ng"
  },
  {
    "slug": "waec",
    "name": "West African Examinations Council Nigeria",
    "shortName": "WAEC",
    "description": "WASSCE results, certificates and confirmation services.",
    "website": "https://www.waecnigeria.org"
  },
  {
    "slug": "neco",
    "name": "National Examinations Council",
    "shortName": "NECO",
    "description": "NECO results, result tokens and verification services.",
    "website": "https://www.neco.gov.ng"
  },
  {
    "slug": "nabteb",
    "name": "National Business and Technical Examinations Board",
    "shortName": "NABTEB",
    "description": "Technical and business examinations, results and certificate services.",
    "website": "https://nabteb.gov.ng"
  },
  {
    "slug": "nysc",
    "name": "National Youth Service Corps",
    "shortName": "NYSC",
    "description": "Mobilisation, registration, relocation and certificate services.",
    "website": "https://www.nysc.gov.ng"
  },
  {
    "slug": "npc",
    "name": "National Population Commission",
    "shortName": "NPC",
    "description": "Birth registration, attestation and certificate services.",
    "website": "https://www.nationalpopulation.gov.ng"
  },
  {
    "slug": "nrs",
    "name": "Nigeria Revenue Service",
    "shortName": "NRS",
    "description": "Federal taxpayer registration and self-service tax processes.",
    "website": "https://www.nrs.gov.ng"
  },
  {
    "slug": "fctirs",
    "name": "Federal Capital Territory Internal Revenue Service",
    "shortName": "FCT-IRS",
    "description": "Tax filing, clearance and taxpayer services for residents of the FCT.",
    "website": "https://fctirs.gov.ng"
  },
  {
    "slug": "eirs",
    "name": "Edo State Internal Revenue Service",
    "shortName": "EIRS",
    "description": "Taxpayer and revenue services for Edo State.",
    "website": "https://eirs.gov.ng"
  },
  {
    "slug": "airs",
    "name": "Anambra State Internal Revenue Service",
    "shortName": "AIRS",
    "description": "Anambra State tax, ASIN and revenue services.",
    "website": "https://airs.an.gov.ng"
  },
  {
    "slug": "lagos-revenue",
    "name": "Lagos State Revenue Portal",
    "shortName": "LASG Revenue",
    "description": "Lagos State payer identity and MDA revenue services.",
    "website": "https://revenue.lagosstate.gov.ng"
  },
  {
    "slug": "lasrra",
    "name": "Lagos State Residents Registration Agency",
    "shortName": "LASRRA",
    "description": "Lagos resident registration, biometric capture and LAG-ID services.",
    "website": "https://www.lagosresidents.gov.ng"
  },
  {
    "slug": "lagos-luc",
    "name": "Lagos State Land Use Charge",
    "shortName": "Lagos LUC",
    "description": "Lagos property Land Use Charge billing, payment and account services.",
    "website": "https://luc.lagosstate.gov.ng"
  },
  {
    "slug": "lasbca",
    "name": "Lagos State Building Control Agency",
    "shortName": "LASBCA",
    "description": "Lagos building control, inspections and completion/fitness certification.",
    "website": "https://lasbca.lagosstate.gov.ng"
  },
  {
    "slug": "ogirs",
    "name": "Ogun State Internal Revenue Service",
    "shortName": "OGIRS",
    "description": "Ogun taxpayer registration, eTCC and state revenue services.",
    "website": "https://www.ogunstaterevenue.com"
  },
  {
    "slug": "rivers-birs",
    "name": "Rivers State Internal Revenue Service",
    "shortName": "Rivers IRS",
    "description": "RIVTIN, RIVTAMIS, tax clearance and Rivers State revenue services.",
    "website": "https://riversbirs.gov.ng"
  },
  {
    "slug": "ncc",
    "name": "Nigerian Communications Commission",
    "shortName": "NCC",
    "description": "Telecommunications regulation, SIM-NIN linkage and consumer information.",
    "website": "https://www.ncc.gov.ng"
  },
  {
    "slug": "nelfund",
    "name": "Nigerian Education Loan Fund",
    "shortName": "NELFUND",
    "description": "Federal student-loan application, disbursement and repayment services.",
    "website": "https://nelf.gov.ng"
  },
  {
    "slug": "nerc",
    "name": "Nigerian Electricity Regulatory Commission",
    "shortName": "NERC",
    "description": "Electricity metering, billing, tariffs and consumer-redress guidance.",
    "website": "https://nerc.gov.ng"
  },
  {
    "slug": "nhia",
    "name": "National Health Insurance Authority",
    "shortName": "NHIA",
    "description": "National health-insurance enrolment and coverage programmes.",
    "website": "https://www.nhia.gov.ng"
  },
  {
    "slug": "pencom",
    "name": "National Pension Commission",
    "shortName": "PenCom",
    "description": "Retirement Savings Accounts, pension transfers and contribution complaints.",
    "website": "https://www.pencom.gov.ng"
  },
  {
    "slug": "nafdac",
    "name": "National Agency for Food and Drug Administration and Control",
    "shortName": "NAFDAC",
    "description": "Registration, renewal and verification of regulated products.",
    "website": "https://www.nafdac.gov.ng"
  },
  {
    "slug": "fccpc",
    "name": "Federal Competition and Consumer Protection Commission",
    "shortName": "FCCPC",
    "description": "Consumer complaints, redress and competition/consumer-protection services.",
    "website": "https://fccpc.gov.ng"
  },
  {
    "slug": "fmbn",
    "name": "Federal Mortgage Bank of Nigeria",
    "shortName": "FMBN",
    "description": "National Housing Fund contributions, mortgages and refunds.",
    "website": "https://fmbn.gov.ng"
  },
  {
    "slug": "ncs",
    "name": "Nigeria Customs Service",
    "shortName": "NCS",
    "description": "Customs clearance, vehicle verification and trade-related services.",
    "website": "https://customs.gov.ng"
  },
  {
    "slug": "interior",
    "name": "Federal Ministry of Interior",
    "shortName": "Ministry of Interior",
    "description": "Federal statutory marriage registration and document services.",
    "website": "https://interior.gov.ng"
  },
  {
    "slug": "nipo",
    "name": "Nigerian Industrial Property Office",
    "shortName": "NIPO",
    "description": "Trademark, patent and industrial-design registration services.",
    "website": "https://nipo.gov.ng"
  },
  {
    "slug": "copyright-commission",
    "name": "Nigerian Copyright Commission",
    "shortName": "Copyright Commission",
    "description": "Copyright registration, certification and anti-piracy services.",
    "website": "https://copyright.gov.ng"
  },
  {
    "slug": "nepc",
    "name": "Nigerian Export Promotion Council",
    "shortName": "NEPC",
    "description": "Exporter registration, certification and export-support services.",
    "website": "https://nepc.gov.ng"
  },
  {
    "slug": "smedan",
    "name": "Small and Medium Enterprises Development Agency of Nigeria",
    "shortName": "SMEDAN",
    "description": "MSME registration, business-development and enterprise-support services.",
    "website": "https://smedan.gov.ng"
  },
  {
    "slug": "bpp",
    "name": "Bureau of Public Procurement",
    "shortName": "BPP",
    "description": "Federal contractor, consultant and service-provider registration.",
    "website": "https://bpp.gov.ng"
  },
  {
    "slug": "son",
    "name": "Standards Organisation of Nigeria",
    "shortName": "SON",
    "description": "SONCAP, MANCAP and regulated-product certification services.",
    "website": "https://son.gov.ng"
  },
  {
    "slug": "nsitf",
    "name": "Nigeria Social Insurance Trust Fund",
    "shortName": "NSITF",
    "description": "Employees' Compensation Scheme registration, claims and compliance.",
    "website": "https://nsitf.gov.ng"
  },
  {
    "slug": "nde",
    "name": "National Directorate of Employment",
    "shortName": "NDE",
    "description": "Employment, vocational-skills and job-creation programme services.",
    "website": "https://nde.gov.ng"
  },
  {
    "slug": "scuml",
    "name": "Special Control Unit Against Money Laundering",
    "shortName": "SCUML",
    "description": "EFCC registration, certification and verification for designated non-financial businesses and professions.",
    "website": "https://scuml.efcc.gov.ng"
  },
  {
    "slug": "itf",
    "name": "Industrial Training Fund",
    "shortName": "ITF",
    "description": "Employer registration, statutory training contributions and compliance certificates.",
    "website": "https://www.itf.gov.ng"
  },
  {
    "slug": "ukvi",
    "name": "UK Visas and Immigration",
    "shortName": "UKVI",
    "description": "United Kingdom visa and immigration services.",
    "website": "https://www.gov.uk/government/organisations/uk-visas-and-immigration"
  },
  {
    "slug": "usdos",
    "name": "U.S. Department of State – Bureau of Consular Affairs",
    "shortName": "U.S. Visas",
    "description": "United States nonimmigrant and immigrant visa guidance.",
    "website": "https://travel.state.gov/content/travel/en/us-visas.html"
  },
  {
    "slug": "ircc",
    "name": "Immigration, Refugees and Citizenship Canada",
    "shortName": "IRCC",
    "description": "Canadian visitor, study, work and immigration services.",
    "website": "https://www.canada.ca/en/immigration-refugees-citizenship.html"
  },
  {
    "slug": "france-visas",
    "name": "France-Visas",
    "shortName": "France-Visas",
    "description": "Official French visa information and application service.",
    "website": "https://france-visas.gouv.fr/en/"
  },
  {
    "slug": "au-home-affairs",
    "name": "Australian Department of Home Affairs",
    "shortName": "Home Affairs",
    "description": "Australian visa, immigration and citizenship services.",
    "website": "https://immi.homeaffairs.gov.au/"
  },
  {
    "slug": "uae-icp",
    "name": "UAE Federal Authority for Identity, Citizenship, Customs & Port Security",
    "shortName": "UAE ICP",
    "description": "United Arab Emirates entry permits, visit visas and identity services.",
    "website": "https://icp.gov.ae/en/"
  },
  {
    "slug": "south-africa-dha",
    "name": "South African Department of Home Affairs",
    "shortName": "South Africa DHA",
    "description": "South African visa, immigration and civic services.",
    "website": "https://www.dha.gov.za/"
  },
  {
    "slug": "ireland-immigration",
    "name": "Immigration Service Delivery Ireland",
    "shortName": "Irish Immigration",
    "description": "Ireland entry visa and immigration services.",
    "website": "https://www.irishimmigration.ie/"
  },
  {
    "slug": "germany-foreign-office",
    "name": "German Federal Foreign Office",
    "shortName": "Germany Visa",
    "description": "German Schengen and national visa services.",
    "website": "https://www.auswaertiges-amt.de/en/"
  },
  {
    "slug": "italy-maeci",
    "name": "Italian Ministry of Foreign Affairs and International Cooperation",
    "shortName": "Italy Visa",
    "description": "Italian Schengen and national visa services.",
    "website": "https://www.esteri.it/en/"
  },
  {
    "slug": "spain-maec",
    "name": "Spanish Ministry of Foreign Affairs, European Union and Cooperation",
    "shortName": "Spain Visa",
    "description": "Spanish Schengen and national visa services.",
    "website": "https://www.exteriores.gob.es/en/"
  },
  {
    "slug": "netherlands-mfa",
    "name": "Netherlands Ministry of Foreign Affairs",
    "shortName": "Netherlands Visa",
    "description": "Dutch Schengen visa and consular services.",
    "website": "https://www.netherlandsworldwide.nl/"
  },
  {
    "slug": "turkiye-mfa",
    "name": "Republic of Türkiye Ministry of Foreign Affairs",
    "shortName": "Türkiye Visa",
    "description": "Türkiye visa and consular services.",
    "website": "https://www.mfa.gov.tr/"
  },
  {
    "slug": "china-mfa",
    "name": "Embassy of the People's Republic of China in Nigeria",
    "shortName": "China Visa",
    "description": "Chinese visa guidance and consular services for applicants in Nigeria.",
    "website": "https://ng.china-embassy.gov.cn/eng/"
  },
  {
    "slug": "mtn-nigeria",
    "name": "MTN Nigeria",
    "shortName": "MTN",
    "description": "Private mobile-network services including SIM, eSIM, roaming, data and account support.",
    "website": "https://www.mtn.ng/"
  },
  {
    "slug": "airtel-nigeria",
    "name": "Airtel Nigeria",
    "shortName": "Airtel",
    "description": "Private mobile-network services including SIM, eSIM, data, account and customer support.",
    "website": "https://www.airtel.com.ng/"
  },
  {
    "slug": "globacom",
    "name": "Globacom Limited",
    "shortName": "Glo",
    "description": "Private mobile-network services including SIM, eSIM, data and customer support.",
    "website": "https://www.gloworld.com/ng/"
  },
  {
    "slug": "moniepoint",
    "name": "Moniepoint Microfinance Bank",
    "shortName": "Moniepoint",
    "description": "Private personal and business banking, cards, payments, USSD and account services.",
    "website": "https://moniepoint.com/ng/"
  },
  {
    "slug": "firstbank",
    "name": "First Bank of Nigeria Limited",
    "shortName": "FirstBank",
    "description": "Private retail and business banking, account, card and digital-banking services.",
    "website": "https://www.firstbanknigeria.com/"
  },
  {
    "slug": "uba",
    "name": "United Bank for Africa Nigeria",
    "shortName": "UBA",
    "description": "Private retail, business and digital banking services in Nigeria.",
    "website": "https://www.ubagroup.com/nigeria/"
  },
  {
    "slug": "access-bank",
    "name": "Access Bank Plc",
    "shortName": "Access Bank",
    "description": "Private retail and business banking, cards, account and digital-banking services.",
    "website": "https://www.accessbankplc.com/"
  },
  {
    "slug": "dstv-nigeria",
    "name": "DStv Nigeria",
    "shortName": "DStv",
    "description": "Private pay-TV subscription, payment, package and decoder self-service.",
    "website": "https://www.dstv.com/en-ng/"
  },
  {
    "slug": "gotv-nigeria",
    "name": "GOtv Nigeria",
    "shortName": "GOtv",
    "description": "Private pay-TV subscription, payment, package and decoder self-service.",
    "website": "https://www.gotvafrica.com/en-ng/"
  },
  {
    "slug": "air-peace",
    "name": "Air Peace",
    "shortName": "Air Peace",
    "description": "Private Nigerian airline booking, check-in, baggage and passenger-support services.",
    "website": "https://flyairpeace.com/"
  },
  {
    "slug": "dhl-express-nigeria",
    "name": "DHL Express Nigeria",
    "shortName": "DHL Express",
    "description": "Private international express shipping, pickup, drop-off and shipment-tracking services.",
    "website": "https://www.dhl.com/ng-en/home.html"
  },
  {
    "slug": "british-council-nigeria",
    "name": "British Council Nigeria",
    "shortName": "British Council",
    "description": "Private/non-government examination and education services including IELTS testing in Nigeria.",
    "website": "https://www.britishcouncil.org.ng/"
  },
  {
    "slug": "idp-ielts-nigeria",
    "name": "IDP IELTS Nigeria",
    "shortName": "IDP IELTS",
    "description": "Private IELTS booking, testing and candidate-support services across Nigerian test centres.",
    "website": "https://ielts.idp.com/nigeria"
  },
  {
    "slug": "gigm",
    "name": "GIG Mobility",
    "shortName": "GIGM",
    "description": "Private intercity transport booking and mobility services across Nigeria and other African markets.",
    "website": "https://gigm.com/"
  },
  {
    "slug": "ekedp",
    "name": "Eko Electricity Distribution Plc",
    "shortName": "EKEDP",
    "description": "Private electricity distribution, payment, metering and customer self-service for the Eko distribution area.",
    "website": "https://www.ekedp.com/"
  },
  {
    "slug": "starlink-nigeria",
    "name": "Starlink Nigeria",
    "shortName": "Starlink",
    "description": "Private satellite-internet hardware, activation, subscription and account-support services in Nigeria.",
    "website": "https://www.starlink.com/ng/"
  },
  {
    "slug": "synlab-nigeria",
    "name": "SYNLAB Nigeria",
    "shortName": "SYNLAB",
    "description": "Private diagnostic laboratory, sample-collection and online result-access services in Nigeria.",
    "website": "https://www.synlab.com.ng/"
  },
  {
    "slug": "evercare-hospital-lekki",
    "name": "Evercare Hospital Lekki",
    "shortName": "Evercare",
    "description": "Private multispecialty hospital appointment, teleconsultation, homecare and patient-portal services in Lagos.",
    "website": "https://www.evercare.ng/"
  },
  {
    "slug": "paystack",
    "name": "Paystack",
    "shortName": "Paystack",
    "description": "Private payment-service provider for Nigerian businesses, including merchant activation, terminals and payment acceptance.",
    "website": "https://paystack.com/"
  },
  {
    "slug": "leadway-assurance",
    "name": "Leadway Assurance Company Limited",
    "shortName": "Leadway",
    "description": "Private insurance provider offering motor and other insurance services in Nigeria.",
    "website": "https://www.leadway.com/"
  },
  {
    "slug": "uber-nigeria",
    "name": "Uber Nigeria",
    "shortName": "Uber",
    "description": "Private ride-hailing platform with driver-partner onboarding and rider services in Nigerian cities.",
    "website": "https://www.uber.com/ng/en/"
  },
  {
    "slug": "bolt-nigeria",
    "name": "Bolt Nigeria",
    "shortName": "Bolt",
    "description": "Private ride-hailing and mobility platform with driver-partner onboarding in cities across Nigeria.",
    "website": "https://bolt.eu/en-ng/"
  },
  {
    "slug": "smile-nigeria",
    "name": "Smile Communications Nigeria",
    "shortName": "Smile",
    "description": "Private broadband and voice provider with data recharge, self-care and device services in Nigeria.",
    "website": "https://smile.com.ng/"
  },
  {
    "slug": "spectranet",
    "name": "Spectranet Nigeria",
    "shortName": "Spectranet",
    "description": "Private broadband provider offering wireless and fibre data plans, recharge and account self-service in Nigeria.",
    "website": "https://spectranet.com.ng/"
  },
  {
    "slug": "konga",
    "name": "Konga",
    "shortName": "Konga",
    "description": "Private Nigerian e-commerce marketplace with shopping, returns and SellerHQ merchant services.",
    "website": "https://www.konga.com/"
  },
  {
    "slug": "jumia-nigeria",
    "name": "Jumia Nigeria",
    "shortName": "Jumia",
    "description": "Private e-commerce marketplace with shopping and seller-onboarding services in Nigeria.",
    "website": "https://www.jumia.com.ng/"
  },
  {
    "slug": "gtbank",
    "name": "Guaranty Trust Bank Limited",
    "shortName": "GTBank",
    "description": "Private Nigerian bank offering retail, business and digital banking services including 737 USSD.",
    "website": "https://www.gtbank.com/"
  },
  {
    "slug": "zenith-bank",
    "name": "Zenith Bank Plc",
    "shortName": "Zenith Bank",
    "description": "Private Nigerian bank offering retail, business and digital banking services.",
    "website": "https://www.zenithbank.com/"
  },
  {
    "slug": "stanbic-ibtc-bank",
    "name": "Stanbic IBTC Bank",
    "shortName": "Stanbic IBTC",
    "description": "Private Nigerian bank offering personal, business and digital banking services.",
    "website": "https://www.stanbicibtcbank.com/nigeriabank/"
  },
  {
    "slug": "fidelity-bank",
    "name": "Fidelity Bank Plc",
    "shortName": "Fidelity Bank",
    "description": "Private Nigerian bank offering personal and business banking, including digital business-account onboarding.",
    "website": "https://fidelitybank.ng/"
  },
  {
    "slug": "flutterwave",
    "name": "Flutterwave",
    "shortName": "Flutterwave",
    "description": "Private payment technology provider offering merchant onboarding, payment acceptance and settlement services in Nigeria.",
    "website": "https://flutterwave.com/"
  },
  {
    "slug": "opay",
    "name": "OPay",
    "shortName": "OPay",
    "description": "Private Nigerian financial-services platform offering accounts, transfers, cards, merchant services and emergency security controls.",
    "website": "https://opayweb.com/ng/"
  },
  {
    "slug": "kuda",
    "name": "Kuda Microfinance Bank",
    "shortName": "Kuda",
    "description": "Private digital bank offering personal and business accounts, cards, transfers and account-tier services in Nigeria.",
    "website": "https://www.kuda.com/"
  },
  {
    "slug": "ikeja-electric",
    "name": "Ikeja Electric Plc",
    "shortName": "Ikeja Electric",
    "description": "Private electricity distribution company serving parts of Lagos with metering, token, billing and customer self-service.",
    "website": "https://www.ikejaelectric.com/"
  },
  {
    "slug": "ets",
    "name": "Educational Testing Service",
    "shortName": "ETS",
    "description": "Private/nonprofit testing provider for TOEFL and GRE registration, test administration and score services available to candidates in Nigeria.",
    "website": "https://www.ets.org/"
  },
  {
    "slug": "pearson-pte",
    "name": "Pearson PTE",
    "shortName": "Pearson PTE",
    "description": "Private English-language testing provider with PTE test booking and approved test centres in Nigeria.",
    "website": "https://www.pearsonpte.com/"
  },
  {
    "slug": "gmac",
    "name": "Graduate Management Admission Council",
    "shortName": "GMAC",
    "description": "Private/nonprofit provider of the GMAT exam and official mba.com registration services used by candidates in Nigeria.",
    "website": "https://www.mba.com/"
  },
  {
    "slug": "axa-mansard",
    "name": "AXA Mansard Insurance Plc",
    "shortName": "AXA Mansard",
    "description": "Private Nigerian insurer offering motor and other insurance products with online purchase and claims services.",
    "website": "https://www.axamansard.com/"
  },
  {
    "slug": "gig-logistics",
    "name": "GIG Logistics",
    "shortName": "GIGL",
    "description": "Private Nigerian logistics provider offering domestic/international shipping, pickup, tracking and merchant delivery services.",
    "website": "https://giglogistics.com/"
  },
  {
    "slug": "guo-transport",
    "name": "GUO Transport",
    "shortName": "GUO Transport",
    "description": "Private Nigerian intercity transport provider offering local/international bus booking and passenger services.",
    "website": "https://www.guotransport.com/"
  },
  {
    "slug": "palmpay",
    "name": "PalmPay",
    "shortName": "PalmPay",
    "description": "Private Nigerian financial-services platform offering accounts, transfers, bills, merchant services and KYC-tiered access.",
    "website": "https://www.palmpay.com/nigeria/"
  },
  {
    "slug": "aedc",
    "name": "Abuja Electricity Distribution Plc",
    "shortName": "AEDC",
    "description": "Private electricity distribution company serving Abuja and surrounding franchise areas with payment, metering, refund and customer self-service.",
    "website": "https://www.abujaelectricity.com/"
  },
  {
    "slug": "ibedc",
    "name": "Ibadan Electricity Distribution Company Plc",
    "shortName": "IBEDC",
    "description": "Private electricity distribution company serving Oyo, Ogun, Osun, Kwara and parts of Niger, Ekiti and Kogi with payment, metering and customer self-service.",
    "website": "https://www.ibedc.com/"
  },
  {
    "slug": "ecobank-nigeria",
    "name": "Ecobank Nigeria Limited",
    "shortName": "Ecobank",
    "description": "Private Nigerian bank offering personal, business, mobile, agency and account self-service across its pan-African network.",
    "website": "https://www.ecobank.com/ng/"
  },
  {
    "slug": "fcmb",
    "name": "First City Monument Bank",
    "shortName": "FCMB",
    "description": "Private Nigerian bank offering personal and business accounts, digital onboarding and self-service banking.",
    "website": "https://www.fcmb.com/"
  },
  {
    "slug": "alat-wema",
    "name": "ALAT by Wema Bank",
    "shortName": "ALAT",
    "description": "Wema Bank's private digital-banking platform for account opening, cards, transfers, bills and other app-based services.",
    "website": "https://alat.ng/"
  },
  {
    "slug": "sterling-bank",
    "name": "Sterling Bank",
    "shortName": "Sterling",
    "description": "Private Nigerian bank offering OneBank digital onboarding, account upgrades, cards and other personal banking services.",
    "website": "https://sterling.ng/"
  },
  {
    "slug": "hygeia-hmo",
    "name": "Hygeia HMO",
    "shortName": "Hygeia HMO",
    "description": "Private Nigerian health-maintenance organisation offering individual, family and business health plans with a provider network.",
    "website": "https://hygeiahmo.com/"
  },
  {
    "slug": "phed",
    "name": "Port Harcourt Electricity Distribution Plc",
    "shortName": "PHED",
    "description": "Private electricity distribution company serving Rivers, Bayelsa, Cross River and Akwa Ibom with payment, metering and customer-service routes.",
    "website": "https://phed.com.ng/"
  },
  {
    "slug": "kaduna-electric",
    "name": "Kaduna Electricity Distribution Company",
    "shortName": "Kaduna Electric",
    "description": "Private electricity distribution company serving Kaduna, Kebbi, Sokoto and Zamfara with token, billing and MAP metering services.",
    "website": "https://kadunaelectric.com/"
  },
  {
    "slug": "eedc",
    "name": "Enugu Electricity Distribution Company Plc",
    "shortName": "EEDC",
    "description": "Private electricity distribution company serving the South-East with bill payment, customer self-service, connections and metering services.",
    "website": "https://enugudisco.com/"
  },
  {
    "slug": "kedco",
    "name": "Kano Electricity Distribution Company",
    "shortName": "KEDCO",
    "description": "Private electricity distribution company serving Kano, Jigawa and Katsina with customer connection, billing and MAP metering services.",
    "website": "https://kedco.ng/"
  }
  {
    "slug": "yedc",
    "name": "Yola Electricity Distribution Company",
    "shortName": "YEDC",
    "description": "Private electricity distribution company serving Adamawa, Borno, Taraba and Yobe with payment, metering, new connection and complaint services.",
    "website": "https://www.yedc.com.ng/"
  },
  {
    "slug": "jed",
    "name": "Jos Electricity Distribution Plc",
    "shortName": "JED",
    "description": "Private electricity distribution company serving Plateau, Bauchi, Benue and Gombe with payment, metering, connection and customer-care services.",
    "website": "https://www.jedplc.com/"
  },
  {
    "slug": "union-bank",
    "name": "Union Bank of Nigeria",
    "shortName": "Union Bank",
    "description": "Private Nigerian bank offering account opening, debit-card, USSD and online banking services.",
    "website": "https://unionbankng.com/"
  },
  {
    "slug": "keystone-bank",
    "name": "Keystone Bank Limited",
    "shortName": "Keystone Bank",
    "description": "Private Nigerian bank offering personal accounts, *7111# USSD, card and digital banking services.",
    "website": "https://www.keystonebankng.com/"
  },
  {
    "slug": "avon-hmo",
    "name": "Avon HMO",
    "shortName": "Avon HMO",
    "description": "Private health maintenance organisation offering individual health plans and provider-network access in Nigeria.",
    "website": "https://www.avonhealthcare.com/"
  },
  {
    "slug": "ibom-air",
    "name": "Ibom Air",
    "shortName": "Ibom Air",
    "description": "Private Nigerian airline offering domestic/regional booking, online check-in, ticket changes and baggage services.",
    "website": "https://www.ibomair.com/"
  },
  {
    "slug": "arik-air",
    "name": "Arik Air",
    "shortName": "Arik Air",
    "description": "Private Nigerian airline offering domestic flight booking, manage-booking and online check-in services.",
    "website": "https://arikair.com/"
  },
  {
    "slug": "green-africa",
    "name": "Green Africa Airways",
    "shortName": "Green Africa",
    "description": "Private Nigerian airline offering domestic booking, web check-in, fare and baggage services.",
    "website": "https://www.greenafrica.com/"
  },
  {
    "slug": "bedc",
    "name": "BEDC Electricity Plc",
    "shortName": "BEDC",
    "description": "Private electricity distribution company serving Edo, Delta, Ondo and Ekiti with metering, billing, token and customer-support services.",
    "website": "https://beninelectric.com/"
  },
  {
    "slug": "college-board",
    "name": "College Board",
    "shortName": "College Board",
    "description": "Private/nonprofit education organisation providing SAT registration, international testing and score services used by candidates in Nigeria.",
    "website": "https://www.collegeboard.org/"
  },
  {
    "slug": "reliance-hmo",
    "name": "Reliance HMO",
    "shortName": "Reliance HMO",
    "description": "Private Nigerian health maintenance organisation offering individual, family and business health plans and provider-network services.",
    "website": "https://getreliancehealth.com/nigeria/"
  },
  {
    "slug": "t2-mobile",
    "name": "T2 Mobile Nigeria",
    "shortName": "T2 Mobile",
    "description": "Private Nigerian mobile-network provider, formerly 9mobile, offering voice, data, airtime/data transfer and self-service.",
    "website": "https://t2mobile.com.ng/"
  },
  {
    "slug": "startimes-nigeria",
    "name": "StarTimes Nigeria",
    "shortName": "StarTimes",
    "description": "Private pay-TV provider offering decoder recharge, bouquet management and app-based self-service in Nigeria.",
    "website": "https://www.startimestv.com/"
  },
  {
    "slug": "ipnx",
    "name": "ipNX Nigeria",
    "shortName": "ipNX",
    "description": "Private Nigerian fibre and broadband provider offering subscription renewal, plan changes, fault reporting and self-service.",
    "website": "https://www.ipnxnigeria.net/"
  },
  {
    "slug": "fiberone",
    "name": "FiberOne Broadband",
    "shortName": "FiberOne",
    "description": "Private Nigerian fibre broadband provider offering installation, renewal, relocation and account self-service.",
    "website": "https://fob.ng/"
  },
  {
    "slug": "nomba",
    "name": "Nomba",
    "shortName": "Nomba",
    "description": "Private Nigerian business-banking and payment provider offering accounts, POS terminals, payment links and merchant services.",
    "website": "https://nomba.com/"
  },
  {
    "slug": "standard-chartered-nigeria",
    "name": "Standard Chartered Bank Nigeria",
    "shortName": "Standard Chartered",
    "description": "Private bank offering SC Mobile account opening, online/mobile banking, cards and digital service requests in Nigeria.",
    "website": "https://www.sc.com/ng/"
  },
  {
    "slug": "united-nigeria-airlines",
    "name": "United Nigeria Airlines",
    "shortName": "United Nigeria",
    "description": "Private Nigerian airline offering domestic and regional booking, online check-in, booking management and baggage services.",
    "website": "https://flyunitednigeria.com/"
  },
  {
    "slug": "valuejet",
    "name": "ValueJet",
    "shortName": "ValueJet",
    "description": "Private Nigerian airline offering booking, online check-in, fare products and baggage services.",
    "website": "https://www.flyvaluejet.com/"
  },
  {
    "slug": "aero-contractors",
    "name": "Aero Contractors",
    "shortName": "Aero",
    "description": "Private Nigerian airline offering flight booking, manage-booking, online check-in and refund services.",
    "website": "https://flyaero.com/"
  },
  {
    "slug": "jaiz-bank",
    "name": "Jaiz Bank Plc",
    "shortName": "Jaiz Bank",
    "description": "Private Nigerian non-interest bank offering personal, corporate and digital account services.",
    "website": "https://jaizbankplc.com/"
  },
  {
    "slug": "unity-bank",
    "name": "Unity Bank Plc",
    "shortName": "Unity Bank",
    "description": "Private Nigerian bank offering retail, business and digital banking services including *7799#.",
    "website": "https://www.unitybankng.com/"
  },
  {
    "slug": "paga",
    "name": "Paga",
    "shortName": "Paga",
    "description": "Private Nigerian mobile-money and payment platform offering personal wallets, merchant payments and business services.",
    "website": "https://www.mypaga.com/"
  },
  {
    "slug": "quickteller",
    "name": "Quickteller by Interswitch",
    "shortName": "Quickteller",
    "description": "Private payment platform for transfers, airtime/data, bill payments and merchant payments in Nigeria.",
    "website": "https://quickteller.com/"
  },
  {
    "slug": "ups-nigeria",
    "name": "UPS Nigeria",
    "shortName": "UPS",
    "description": "Private international parcel shipping, rate, pickup and tracking services available to customers in Nigeria.",
    "website": "https://www.ups.com/ng/en/Home.page"
  },
  {
    "slug": "max-air",
    "name": "Max Air",
    "shortName": "Max Air",
    "description": "Private Nigerian airline offering domestic/international booking, online check-in, booking management and baggage services.",
    "website": "https://maxair.com.ng/"
  },
  {
    "slug": "carbon",
    "name": "Carbon Microfinance Bank",
    "shortName": "Carbon",
    "description": "Private CBN-licensed digital bank offering current accounts, payments, KYC-tier services and personal credit in Nigeria.",
    "website": "https://www.getcarbon.co/"
  },
  {
    "slug": "fairmoney",
    "name": "FairMoney Microfinance Bank",
    "shortName": "FairMoney",
    "description": "Private CBN-licensed digital bank offering personal and business accounts, payments, cards, savings and credit services.",
    "website": "https://fairmoney.io/"
  },
  {
    "slug": "abc-transport",
    "name": "ABC Transport Plc",
    "shortName": "ABC Transport",
    "description": "Private Nigerian intercity and cross-border transport operator offering route schedules and online bus booking.",
    "website": "https://www.abctransport.com/"
  },
  {
    "slug": "remita",
    "name": "Remita Payment Services Limited",
    "shortName": "Remita",
    "description": "Private CBN-licensed payment platform for biller payments, RRR invoices and electronic payment services in Nigeria.",
    "website": "https://www.remita.net/"
  },
  {
    "slug": "red-star-express",
    "name": "Red Star Express Plc",
    "shortName": "Red Star Express",
    "description": "Private Nigerian courier and logistics provider and FedEx licensee offering domestic/international shipping and tracking.",
    "website": "https://redstarplc.com/"
  },
  {
    "slug": "aiico",
    "name": "AIICO Insurance Plc",
    "shortName": "AIICO",
    "description": "Private Nigerian composite insurer offering motor, life, health, travel and other insurance purchase and claims services.",
    "website": "https://www.aiicoplc.com/"
  },
  {
    "slug": "polaris-bank",
    "name": "Polaris Bank Limited",
    "shortName": "Polaris Bank",
    "description": "Private Nigerian bank offering VULTe, online banking, identity-linking and account service requests.",
    "website": "https://www.polarisbanklimited.com/"
  },
  {
    "slug": "providus-bank",
    "name": "ProvidusBank Plc",
    "shortName": "ProvidusBank",
    "description": "Private Nigerian bank offering personal/business accounts and ProvidusPlus digital banking services.",
    "website": "https://www.providusbank.com/"
  },
  {
    "slug": "overland-airways",
    "name": "Overland Airways",
    "shortName": "Overland Airways",
    "description": "Private Nigerian airline offering scheduled flight booking, baggage, ticket changes and refund services.",
    "website": "https://www.overlandairways.com/"
  },
  {
    "slug": "chisco-transport",
    "name": "Chisco Transport",
    "shortName": "Chisco",
    "description": "Private Nigerian and West African intercity transport provider offering online booking, rebooking and passenger services.",
    "website": "https://www.chiscotransport.com.ng/"
  },
  {
    "slug": "rano-air",
    "name": "Rano Air Limited",
    "shortName": "Rano Air",
    "description": "Private Nigerian airline offering scheduled flight booking, booking management and passenger support.",
    "website": "https://www.ranoair.com/"
  }  {
    "slug": "indrive-nigeria",
    "name": "inDrive Nigeria",
    "shortName": "inDrive",
    "description": "Private ride-hailing platform offering rider and driver-partner services in Nigerian cities.",
    "website": "https://indrive.com/"
  },
  {
    "slug": "lagoon-hospitals",
    "name": "Iwosan Lagoon Hospitals",
    "shortName": "Lagoon Hospitals",
    "description": "Private hospital group offering outpatient, specialist and appointment-booking services in Lagos.",
    "website": "https://www.lagoonhospitals.com/"
  },
  {
    "slug": "reddington-hospital",
    "name": "Reddington Multi-Specialist Hospital",
    "shortName": "Reddington",
    "description": "Private multispecialty hospital offering appointments and specialist care in Lagos.",
    "website": "https://reddingtonhospital.com/"
  },
  {
    "slug": "aramex-nigeria",
    "name": "Aramex Nigeria",
    "shortName": "Aramex",
    "description": "Private international courier and logistics provider offering shipment creation, pickup, tracking and Shop & Ship services in Nigeria.",
    "website": "https://www.aramex.com/ng/en"
  },
  {
    "slug": "healthtracka",
    "name": "Healthtracka",
    "shortName": "Healthtracka",
    "description": "Private Nigerian health-testing platform offering home sample collection, laboratory testing and digital results.",
    "website": "https://healthtracka.com/"
  },
  {
    "slug": "oet",
    "name": "Occupational English Test",
    "shortName": "OET",
    "description": "Private English-language test for healthcare professionals with booking routes available to candidates in Nigeria.",
    "website": "https://oet.com/"
  },
  {
    "slug": "acca",
    "name": "Association of Chartered Certified Accountants",
    "shortName": "ACCA",
    "description": "Professional accountancy body offering exam registration and student services to candidates in Nigeria.",
    "website": "https://www.accaglobal.com/"
  },
  {
    "slug": "spotify-nigeria",
    "name": "Spotify Nigeria",
    "shortName": "Spotify",
    "description": "Private music-streaming service offering Free and Premium subscriptions in Nigeria.",
    "website": "https://www.spotify.com/ng/"
  },
  {
    "slug": "netflix-nigeria",
    "name": "Netflix Nigeria",
    "shortName": "Netflix",
    "description": "Private streaming service offering membership, plan management and account support to customers in Nigeria.",
    "website": "https://www.netflix.com/ng/"
  },
  {
    "slug": "wakanow",
    "name": "Wakanow",
    "shortName": "Wakanow",
    "description": "Private Nigerian travel platform offering flight, hotel, package and booking-support services.",
    "website": "https://www.wakanow.com/"
  },
  {
    "slug": "ican",
    "name": "Institute of Chartered Accountants of Nigeria",
    "shortName": "ICAN",
    "description": "Professional accountancy body providing student registration, examinations, membership and training services in Nigeria.",
    "website": "https://icanig.org/"
  },
  {
    "slug": "chowdeck",
    "name": "Chowdeck",
    "shortName": "Chowdeck",
    "description": "Private on-demand delivery platform for food, groceries, pharmacies, local markets, vendors and riders in Nigerian cities.",
    "website": "https://www.chowdeck.com/"
  },
  {
    "slug": "medplus-nigeria",
    "name": "Medplus Nigeria",
    "shortName": "Medplus",
    "description": "Private Nigerian pharmacy and health retail platform offering online ordering and nationwide delivery.",
    "website": "https://medplusnig.com/"
  },
  {
    "slug": "cfa-institute",
    "name": "CFA Institute",
    "shortName": "CFA Institute",
    "description": "Global professional body offering the CFA Program, exam registration, scheduling and credential services to candidates in Nigeria.",
    "website": "https://www.cfainstitute.org/"
  },
  {
    "slug": "cipm-nigeria",
    "name": "Chartered Institute of Personnel Management of Nigeria",
    "shortName": "CIPM",
    "description": "Professional HR body offering student membership, examinations and professional certification services in Nigeria.",
    "website": "https://cipmnigeria.org/"
  },
  {
    "slug": "jiji-nigeria",
    "name": "Jiji Nigeria",
    "shortName": "Jiji",
    "description": "Private Nigerian classifieds marketplace with ad posting, Safe Deal buying, delivery and seller services.",
    "website": "https://jiji.ng/"
  },
  {
    "slug": "citn",
    "name": "Chartered Institute of Taxation of Nigeria",
    "shortName": "CITN",
    "description": "Professional taxation body offering student membership, examinations, induction and subscription services in Nigeria.",
    "website": "https://portal.citn.org/"
  },
  {
    "slug": "cibn",
    "name": "Chartered Institute of Bankers of Nigeria",
    "shortName": "CIBN",
    "description": "Professional banking body offering membership, professional examinations and certification services in Nigeria.",
    "website": "https://www.cibng.org/"
  },
  {
    "slug": "kwik-delivery",
    "name": "Kwik",
    "shortName": "Kwik",
    "description": "Private Nigerian on-demand logistics platform for parcel delivery, businesses, riders, drivers and service agents.",
    "website": "https://kwik.delivery/"
  },
  {
    "slug": "glovo-nigeria",
    "name": "Glovo Nigeria",
    "shortName": "Glovo",
    "description": "Private on-demand delivery platform for restaurant, retail, courier, partner and rider services in Nigeria.",
    "website": "https://glovoapp.com/ng/en/"
  },
  {
    "slug": "hotels-ng",
    "name": "Hotels.ng",
    "shortName": "Hotels.ng",
    "description": "Private Nigerian hotel-booking platform offering accommodation search, reservations, payment and cancellation support.",
    "website": "https://hotels.ng/"
  },
  {
    "slug": "travelstart-nigeria",
    "name": "Travelstart Nigeria",
    "shortName": "Travelstart",
    "description": "Private online travel platform offering flight booking, hotel and travel support services to Nigerian customers.",
    "website": "https://www.travelstart.com.ng/"
  },,
  {
    "slug": "sendbox",
    "name": "Sendbox",
    "shortName": "Sendbox",
    "description": "Private Nigerian shipping and commerce platform offering local/international deliveries, tracking and seller tools.",
    "website": "https://sendbox.co/"
  },
  {
    "slug": "euracare",
    "name": "Euracare Multispecialist Hospital Lagos",
    "shortName": "Euracare",
    "description": "Private multispecialty hospital in Lagos offering specialist appointments, diagnostics and international-patient support.",
    "website": "https://euracarehealth.com/"
  },
  {
    "slug": "heyfood",
    "name": "Heyfood",
    "shortName": "Heyfood",
    "description": "Private Nigerian food-delivery and restaurant-commerce platform offering customer ordering, rider and merchant services.",
    "website": "https://heyfood.africa/"
  },
  {
    "slug": "medbury-labs",
    "name": "Medbury Labs",
    "shortName": "Medbury Labs",
    "description": "Private Nigerian diagnostics provider offering laboratory testing, screening packages and sample-collection services.",
    "website": "https://medburylabs.com/"
  },
  {
    "slug": "healthplus",
    "name": "HealthPlus Nigeria",
    "shortName": "HealthPlus",
    "description": "Private Nigerian pharmacy and e-pharmacy offering online health, wellness and pharmacy-product ordering and delivery.",
    "website": "https://healthplusnigeria.com/"
  },
  {
    "slug": "custodian-insurance",
    "name": "Custodian and Allied Insurance Limited",
    "shortName": "Custodian",
    "description": "Private Nigerian insurer offering motor and other non-life insurance purchase and claims services.",
    "website": "https://custodianinsurance.com/"
  },
  {
    "slug": "nem-insurance",
    "name": "NEM Insurance Plc",
    "shortName": "NEM Insurance",
    "description": "Private Nigerian general insurer offering online cover purchase, quote and claims services.",
    "website": "https://nem-insurance.com/"
  },
  {
    "slug": "lagride",
    "name": "LagRide Nigeria",
    "shortName": "LagRide",
    "description": "Private Lagos e-hailing service offering passenger ride booking and captain onboarding/training.",
    "website": "https://lagride.org/"
  },
  {
    "slug": "covenant-university",
    "name": "Covenant University",
    "shortName": "Covenant University",
    "description": "Private Nigerian university with undergraduate admissions and online screening/application services.",
    "website": "https://www.covenantuniversity.edu.ng/"
  },
  {
    "slug": "babcock-university",
    "name": "Babcock University",
    "shortName": "Babcock University",
    "description": "Private Nigerian university offering undergraduate, Direct Entry and other admission applications.",
    "website": "https://www.babcock.edu.ng/"
  },
  {
    "slug": "abuad",
    "name": "Afe Babalola University, Ado-Ekiti",
    "shortName": "ABUAD",
    "description": "Private Nigerian university offering undergraduate, Direct Entry, transfer and international admission services.",
    "website": "https://www.abuad.edu.ng/"
  },
  {
    "slug": "pan-atlantic-university",
    "name": "Pan-Atlantic University",
    "shortName": "PAU",
    "description": "Private Nigerian university offering undergraduate and postgraduate application services.",
    "website": "https://pau.edu.ng/"
  },
  {
    "slug": "nile-university",
    "name": "Nile University of Nigeria",
    "shortName": "Nile University",
    "description": "Private university in Abuja offering undergraduate, Direct Entry, transfer and postgraduate admission services.",
    "website": "https://nileuniversity.edu.ng/"
  },
  {
    "slug": "american-university-nigeria",
    "name": "American University of Nigeria",
    "shortName": "AUN",
    "description": "Private university in Yola offering undergraduate and graduate admissions for Fall and Spring intakes.",
    "website": "https://www.aun.edu.ng/"
  },
  {
    "slug": "redeemers-university",
    "name": "Redeemer's University",
    "shortName": "RUN",
    "description": "Private Nigerian university offering undergraduate Post-UTME and online admission application services.",
    "website": "https://run.edu.ng/"
  },
  {
    "slug": "lead-city-university",
    "name": "Lead City University",
    "shortName": "LCU",
    "description": "Private university in Ibadan offering undergraduate and other admission applications through online portals.",
    "website": "https://www.lcu.edu.ng/"
  },
  {
    "slug": "caleb-university",
    "name": "Caleb University",
    "shortName": "Caleb University",
    "description": "Private university in Imota, Lagos offering undergraduate, Direct Entry, transfer, postgraduate and distance-learning admissions.",
    "website": "https://calebuniversity.edu.ng/"
  },
  {
    "slug": "bowen-university",
    "name": "Bowen University",
    "shortName": "Bowen University",
    "description": "Private Nigerian university offering undergraduate and postgraduate admissions through official online application portals.",
    "website": "https://bowen.edu.ng/"
  },
  {
    "slug": "igbinedion-university",
    "name": "Igbinedion University Okada",
    "shortName": "IUO",
    "description": "Private Nigerian university offering first-year, Direct Entry, transfer and other admission routes.",
    "website": "https://iuokada.edu.ng/"
  },
  {
    "slug": "veritas-university",
    "name": "Veritas University Abuja",
    "shortName": "Veritas University",
    "description": "Private university in Abuja offering undergraduate, Direct Entry, transfer, postgraduate and JUPEB admission services.",
    "website": "https://www.veritas.edu.ng/"
  }

];

export const services: Service[] = validateServiceCatalog([...serviceRecords, ...privateServiceRecords]);
export const publicServices = services.filter((service) => service.status !== "review");

export type PublicServiceListing = Pick<
  Service,
  "slug" | "title" | "shortTitle" | "summary" | "category" | "agencySlug" | "feeLabel" | "status" | "lastVerified" | "searchTerms"
> & { searchText: string };

export const publicServiceListings: PublicServiceListing[] = publicServices.map((service) => ({
  slug: service.slug,
  title: service.title,
  shortTitle: service.shortTitle,
  summary: service.summary,
  category: service.category,
  agencySlug: service.agencySlug,
  feeLabel: service.feeLabel,
  status: service.status,
  lastVerified: service.lastVerified,
  searchTerms: service.searchTerms,
  searchText: [service.requirements.join(" "), service.steps.join(" "), service.notes.join(" ")].join(" ").slice(0, 1200),
}));

export const categories = [
  {
    "name": "Identity",
    "description": "NIN and identity record services."
  },
  {
    "name": "Banking",
    "description": "Bank accounts, BVN, digital banking, cards, USSD and regulated financial-service guides."
  },
  {
    "name": "Investing",
    "description": "Investor records, dividends and Nigerian capital-market services."
  },
  {
    "name": "Insurance",
    "description": "Insurance purchase, policy validation, claims and verification services."
  },
  {
    "name": "Telecommunications",
    "description": "SIM, eSIM, NIN linkage, mobile-network and telecom consumer services."
  },
  {
    "name": "Student finance",
    "description": "Federal student-loan application, disbursement and repayment services."
  },
  {
    "name": "Electricity",
    "description": "DisCo metering, token purchase, bill payment, tariffs and electricity complaint services."
  },
  {
    "name": "Health insurance",
    "description": "NHIA enrolment and health-insurance programme guidance."
  },
  {
    "name": "Pensions",
    "description": "Retirement Savings Account and pension contribution services."
  },
  {
    "name": "Product regulation",
    "description": "NAFDAC product registration, renewal and verification services."
  },
  {
    "name": "Consumer protection",
    "description": "Consumer complaints and redress services."
  },
  {
    "name": "Housing",
    "description": "NHF contributions, mortgages and housing-finance services."
  },
  {
    "name": "Customs",
    "description": "Vehicle customs verification and customs digital services."
  },
  {
    "name": "Employment & social protection",
    "description": "Employment programmes, employer social insurance and workplace compensation services."
  },
  {
    "name": "International travel",
    "description": "Travel documents, Port Health and border-entry processes."
  },
  {
    "name": "Foreign visas",
    "description": "Official visitor-visa application guides for Nigerians travelling abroad."
  },
  {
    "name": "Police & security",
    "description": "Police certificates and official specialised-service routes."
  },
  {
    "name": "Civic services",
    "description": "Voter-record and PVC administrative services from INEC."
  },
  {
    "name": "Immigration",
    "description": "Passports and immigration processes."
  },
  {
    "name": "Driving",
    "description": "Driver's licence services."
  },
  {
    "name": "Business",
    "description": "CAC registration and corporate filings."
  },
  {
    "name": "Education",
    "description": "JAMB, WAEC, NECO and private examination/test-booking services."
  },
  {
    "name": "Youth service",
    "description": "NYSC mobilisation and certificate services."
  },
  {
    "name": "Civil records",
    "description": "Birth registration and certificate services."
  },
  {
    "name": "Tax",
    "description": "Federal taxpayer self-service."
  },
  {
    "name": "State services",
    "description": "Verified state and FCT digital services."
  },
  {
    "name": "Internet",
    "description": "Private broadband, satellite internet, recharge and account-management services."
  },
  {
    "name": "TV & streaming",
    "description": "Pay-TV subscription, payment, package and decoder self-service."
  },
  {
    "name": "Air travel",
    "description": "Private airline booking, check-in, baggage and passenger-service guides."
  },
  {
    "name": "Intercity transport",
    "description": "Private bus and mobility booking, rescheduling and passenger-service guides."
  },
  {
    "name": "Logistics",
    "description": "Courier, parcel shipping, pickup and shipment-tracking services."
  },
  {
    "name": "Healthcare",
    "description": "Private hospital, diagnostics, appointment and result-access services."
  },
  {
    "name": "Ride-hailing",
    "description": "Driver-partner onboarding and mobility-platform service guides."
  },
  {
    "name": "E-commerce",
    "description": "Marketplace ordering, returns, refunds and seller-onboarding services."
  },
  {
    "name": "Travel & accommodation",
    "description": "Private travel-platform, hotel-booking, reservation, cancellation and traveller-support services."
  }
];

export function getAgency(slug:string) { return agencies.find((agency) => agency.slug === slug); }
export function getService(slug:string) { return services.find((service) => service.slug === slug); }
export function getPublicService(slug:string) { return publicServices.find((service) => service.slug === slug); }
export function getServicesByAgency(slug:string, includeReview = false) {
  return (includeReview ? services : publicServices).filter((service) => service.agencySlug === slug);
}
export function getServicesByStatus(status:VerificationStatus) { return services.filter((service) => service.status === status); }
