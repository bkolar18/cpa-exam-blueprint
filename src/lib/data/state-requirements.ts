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
