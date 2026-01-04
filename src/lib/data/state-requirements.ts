// CPA Exam Requirements by State
// Top 10 states by CPA exam candidates + additional major jurisdictions

export interface StateRequirement {
  code: string;
  name: string;
  boardName: string;
  boardUrl: string;
  educationRequirements: {
    totalCredits: number;
    accountingCredits: number;
    businessCredits: number;
    notes: string[];
  };
  experienceRequirements: {
    totalHours: number;
    yearsRequired: number;
    supervisionRequired: boolean;
    acceptableExperience: string[];
  };
  examRequirements: {
    canSitBeforeDegree: boolean;
    creditTransfer: boolean;
    notes: string[];
  };
  fees: {
    initialApplication: number;
    perSection: number;
    reexamFee: number;
    notes: string[];
  };
  ethicsExam: {
    required: boolean;
    examName: string;
    whenRequired: string;
  };
  residency: {
    required: boolean;
    notes: string;
  };
}

export const stateRequirements: Record<string, StateRequirement> = {
  CA: {
    code: "CA",
    name: "California",
    boardName: "California Board of Accountancy",
    boardUrl: "https://www.dca.ca.gov/cba/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 24,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "Must include ethics course",
        "Can sit with 120 credits, need 150 for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry accounting",
        "Government accounting"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 100,
      perSection: 238,
      reexamFee: 75,
      notes: ["Exam fees set by AICPA/Prometric"]
    },
    ethicsExam: {
      required: true,
      examName: "PETH (Professional Ethics for CPAs)",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency or citizenship requirements"
    }
  },

  TX: {
    code: "TX",
    name: "Texas",
    boardName: "Texas State Board of Public Accountancy",
    boardUrl: "https://www.tsbpa.texas.gov/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 30,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "2 semester hours accounting or business communications",
        "2 semester hours accounting or tax research"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry under CPA supervision",
        "Government accounting"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: false,
      creditTransfer: true,
      notes: ["Must have 150 credits to sit"]
    },
    fees: {
      initialApplication: 50,
      perSection: 238,
      reexamFee: 50,
      notes: ["Application fee is non-refundable"]
    },
    ethicsExam: {
      required: true,
      examName: "Texas Rules of Professional Conduct Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  NY: {
    code: "NY",
    name: "New York",
    boardName: "New York State Education Department",
    boardUrl: "http://www.op.nysed.gov/prof/cpa/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 33,
      businessCredits: 36,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government",
        "Academia"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits including specific requirements"]
    },
    fees: {
      initialApplication: 377,
      perSection: 238,
      reexamFee: 170,
      notes: ["Higher initial application fee than most states"]
    },
    ethicsExam: {
      required: false,
      examName: "N/A",
      whenRequired: "N/A"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  FL: {
    code: "FL",
    name: "Florida",
    boardName: "Florida Board of Accountancy",
    boardUrl: "https://floridasaccountants.gov/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 36,
      businessCredits: 39,
      notes: [
        "Bachelor's degree required",
        "Higher accounting credit requirement",
        "Upper-level accounting courses required"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government accounting"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: false,
      creditTransfer: true,
      notes: ["Must have 150 credits to sit for exam"]
    },
    fees: {
      initialApplication: 50,
      perSection: 238,
      reexamFee: 50,
      notes: ["Reasonable fee structure"]
    },
    ethicsExam: {
      required: false,
      examName: "N/A",
      whenRequired: "N/A"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  IL: {
    code: "IL",
    name: "Illinois",
    boardName: "Illinois Board of Examiners",
    boardUrl: "https://www.ilboe.org/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 30,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private accounting",
        "Government",
        "Teaching"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 120,
      perSection: 238,
      reexamFee: 60,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  PA: {
    code: "PA",
    name: "Pennsylvania",
    boardName: "Pennsylvania State Board of Accountancy",
    boardUrl: "https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/Accountancy/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 24,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit within 120 days of graduation"]
    },
    fees: {
      initialApplication: 65,
      perSection: 238,
      reexamFee: 45,
      notes: ["One of the lower fee structures"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  OH: {
    code: "OH",
    name: "Ohio",
    boardName: "Accountancy Board of Ohio",
    boardUrl: "https://acc.ohio.gov/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 30,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private accounting",
        "Government"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 100,
      perSection: 238,
      reexamFee: 50,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: false,
      examName: "N/A",
      whenRequired: "N/A"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  GA: {
    code: "GA",
    name: "Georgia",
    boardName: "Georgia State Board of Accountancy",
    boardUrl: "https://sao.georgia.gov/board-accountancy",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 30,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private accounting",
        "Government"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 100,
      perSection: 238,
      reexamFee: 60,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  NJ: {
    code: "NJ",
    name: "New Jersey",
    boardName: "New Jersey State Board of Accountancy",
    boardUrl: "https://www.njconsumeraffairs.gov/acc/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 24,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private accounting",
        "Government"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 125,
      perSection: 238,
      reexamFee: 75,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  NC: {
    code: "NC",
    name: "North Carolina",
    boardName: "North Carolina State Board of CPA Examiners",
    boardUrl: "https://nccpaboard.gov/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 30,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private accounting",
        "Government",
        "Academia"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 120,
      perSection: 238,
      reexamFee: 60,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  AZ: {
    code: "AZ",
    name: "Arizona",
    boardName: "Arizona State Board of Accountancy",
    boardUrl: "https://azaccountancy.gov/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 36,
      businessCredits: 30,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits (24 accounting, 18 business)",
        "150 required for license with 36 upper-level accounting"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government accounting",
        "Tax preparation"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits", "Experience must be within 10 years"]
    },
    fees: {
      initialApplication: 100,
      perSection: 238,
      reexamFee: 50,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Professional Ethics Exam",
      whenRequired: "Within 2 years of license application"
    },
    residency: {
      required: true,
      notes: "Must be U.S. citizen with Social Security number"
    }
  },

  CO: {
    code: "CO",
    name: "Colorado",
    boardName: "Colorado State Board of Accountancy",
    boardUrl: "https://dpo.colorado.gov/Accountancy",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 27,
      businessCredits: 27,
      notes: [
        "Bachelor's degree required",
        "150 credits required since July 2015",
        "Broader qualifying experience definitions"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government",
        "Academia",
        "Consulting"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: false,
      creditTransfer: true,
      notes: ["Must have 150 credits to sit"]
    },
    fees: {
      initialApplication: 80,
      perSection: 238,
      reexamFee: 50,
      notes: ["Lower application fee than average"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  WA: {
    code: "WA",
    name: "Washington",
    boardName: "Washington State Board of Accountancy",
    boardUrl: "https://acb.wa.gov/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 24,
      businessCredits: 24,
      notes: [
        "Bachelor's degree with accounting concentration",
        "24 hours upper-level accounting (auditing, financial, managerial, tax)",
        "24 hours business courses (max 6 can be upper-level accounting)"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government",
        "Academia"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Detailed pre-exam vs licensure requirements"]
    },
    fees: {
      initialApplication: 50,
      perSection: 238,
      reexamFee: 50,
      notes: ["Low application fee"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  VA: {
    code: "VA",
    name: "Virginia",
    boardName: "Virginia Board of Accountancy",
    boardUrl: "https://boa.virginia.gov/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 24,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "24 hours upper-level accounting",
        "24 hours upper-level business"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with bachelor's and required credits"]
    },
    fees: {
      initialApplication: 85,
      perSection: 238,
      reexamFee: 60,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "Virginia-specific Ethics Course and Exam",
      whenRequired: "Before license (state-specific requirement)"
    },
    residency: {
      required: true,
      notes: "U.S. residency required, Virginia residency not required"
    }
  },

  MA: {
    code: "MA",
    name: "Massachusetts",
    boardName: "Massachusetts Board of Public Accountancy",
    boardUrl: "https://www.mass.gov/orgs/board-of-public-accountancy",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 21,
      businessCredits: 9,
      notes: [
        "Bachelor's degree required",
        "21 credits in financial accounting, auditing, management accounting, taxation",
        "9 business credits including business law, finance, information systems"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 150,
      perSection: 238,
      reexamFee: 75,
      notes: ["Slightly higher application fee"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  MI: {
    code: "MI",
    name: "Michigan",
    boardName: "Michigan Board of Accountancy",
    boardUrl: "https://www.michigan.gov/lara/bureau-list/bpl/occ/prof/accountancy",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 21,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "Minimum 3 hours in auditing required",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government",
        "Academia"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 90,
      perSection: 238,
      reexamFee: 55,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: false,
      examName: "N/A",
      whenRequired: "N/A"
    },
    residency: {
      required: false,
      notes: "No age, residency, or citizenship requirements. SSN required."
    }
  },

  MN: {
    code: "MN",
    name: "Minnesota",
    boardName: "Minnesota Board of Accountancy",
    boardUrl: "https://boa.state.mn.us/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 24,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "New pathways available (2025): Bachelor's + 2 years exp, or Master's + 1 year exp",
        "Traditional 150-hour path still available"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private accounting",
        "Government",
        "Academia"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: false,
      creditTransfer: true,
      notes: ["Strict residency requirements for exam eligibility"]
    },
    fees: {
      initialApplication: 100,
      perSection: 238,
      reexamFee: 50,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: true,
      notes: "Must be MN resident, attend school in MN, or work in MN to sit for exam"
    }
  },

  MO: {
    code: "MO",
    name: "Missouri",
    boardName: "Missouri State Board of Accountancy",
    boardUrl: "https://pr.mo.gov/accountancy.asp",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 33,
      businessCredits: 27,
      notes: [
        "Bachelor's degree required",
        "33 hours in accounting subjects",
        "27 hours in general business (non-accounting)"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 75,
      perSection: 238,
      reexamFee: 50,
      notes: ["Lower application fee"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "Minimum age of 21 required"
    }
  },

  TN: {
    code: "TN",
    name: "Tennessee",
    boardName: "Tennessee State Board of Accountancy",
    boardUrl: "https://www.tn.gov/commerce/regboards/accountancy.html",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 18,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required before exam",
        "18 credits upper-level accounting",
        "Alternative pathway (2026): 120 hours + 2 years experience"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private accounting (finance, tax, advisory)",
        "Government",
        "Consulting"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: false,
      creditTransfer: true,
      notes: ["Must have bachelor's degree to sit", "New 120-hour pathway effective Jan 2026"]
    },
    fees: {
      initialApplication: 100,
      perSection: 238,
      reexamFee: 50,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  IN: {
    code: "IN",
    name: "Indiana",
    boardName: "Indiana Board of Accountancy",
    boardUrl: "https://www.in.gov/pla/professions/indiana-board-of-accountancy/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 24,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "24 hours accounting (financial, auditing, taxation, managerial)",
        "24 hours business administration/economics",
        "Must complete all education before exam"
      ]
    },
    experienceRequirements: {
      totalHours: 4000,
      yearsRequired: 2,
      supervisionRequired: true,
      acceptableExperience: [
        "Public practice",
        "Private industry",
        "Government",
        "Academia"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: false,
      creditTransfer: true,
      notes: ["Must have 150 credits to sit", "Full education completion required"]
    },
    fees: {
      initialApplication: 40,
      perSection: 238,
      reexamFee: 40,
      notes: ["Low application and reexam fees"]
    },
    ethicsExam: {
      required: false,
      examName: "N/A",
      whenRequired: "N/A"
    },
    residency: {
      required: false,
      notes: "No residency or citizenship requirements"
    }
  },

  WI: {
    code: "WI",
    name: "Wisconsin",
    boardName: "Wisconsin Accounting Examining Board",
    boardUrl: "https://dsps.wi.gov/pages/BoardsCouncils/Accounting/Default.aspx",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 24,
      businessCredits: 24,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 75,
      perSection: 238,
      reexamFee: 50,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "AICPA Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  },

  MD: {
    code: "MD",
    name: "Maryland",
    boardName: "Maryland State Board of Public Accountancy",
    boardUrl: "https://www.dllr.state.md.us/license/cpa/",
    educationRequirements: {
      totalCredits: 150,
      accountingCredits: 27,
      businessCredits: 21,
      notes: [
        "Bachelor's degree required",
        "Can sit with 120 credits",
        "150 required for license"
      ]
    },
    experienceRequirements: {
      totalHours: 2000,
      yearsRequired: 1,
      supervisionRequired: true,
      acceptableExperience: [
        "Public accounting",
        "Private industry",
        "Government",
        "Academia"
      ]
    },
    examRequirements: {
      canSitBeforeDegree: true,
      creditTransfer: true,
      notes: ["Can sit with 120 credits"]
    },
    fees: {
      initialApplication: 100,
      perSection: 238,
      reexamFee: 60,
      notes: ["Standard fee structure"]
    },
    ethicsExam: {
      required: true,
      examName: "Maryland Ethics Exam",
      whenRequired: "Before license"
    },
    residency: {
      required: false,
      notes: "No residency requirements"
    }
  }
};

// Get all states sorted by name
export function getAllStates(): StateRequirement[] {
  return Object.values(stateRequirements).sort((a, b) => a.name.localeCompare(b.name));
}

// Get state by code
export function getStateByCode(code: string): StateRequirement | undefined {
  return stateRequirements[code.toUpperCase()];
}
