export type AnswerType = "ltd" | "medicalCondition" | "gibberish";

export type Country =
  | "Belgium"
  | "Bulgaria"
  | "Czechia"
  | "Denmark"
  | "Germany"
  | "Estonia"
  | "Ireland"
  | "Greece"
  | "Spain"
  | "France"
  | "Croatia"
  | "Italy"
  | "Cyprus"
  | "Latvia"
  | "Lithuania"
  | "Luxembourg"
  | "Hungary"
  | "Malta"
  | "Netherlands"
  | "Austria"
  | "Poland"
  | "Portugal"
  | "Romania"
  | "Slovenia"
  | "Slovakia"
  | "Finland"
  | "Sweden"
  | "Norway"
  | "Switzerland"
  | "United Kingdom";

export interface Answer {
  abbreviation: string;
  fullName: string;
  country?: Country;
}

export interface MedicalCondition extends Answer {
  abbreviation: string;
  fullName: string;
  country?: never;
}

export interface LTD extends Answer {
  abbreviation: string;
  fullName: string;
  country: Country;
}