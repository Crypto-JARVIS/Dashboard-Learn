import { firebaseConfig } from "./firebase.config";

export async function fetchTeam() {
  const response = await fetch(
    `${firebaseConfig.databaseURL}/mockDataTeam.json`
  );
  const resData = await response.json();

  if (!response.ok || resData === null) {
    throw new Error("Failed to fetch Team Data, please try again later");
  }

  return resData;
}

export async function fetchContacts() {
  const response = await fetch(
    `${firebaseConfig.databaseURL}/mockDataContacts.json`
  );
  const resData = await response.json();

  if (!response.ok || resData === null) {
    throw new Error("Failed to fetch Contacts, please try again later");
  }

  return resData;
}

export async function fetchInvoices() {
  const response = await fetch(
    `${firebaseConfig.databaseURL}/mockDataInvoices.json`
  );
  const resData = await response.json();

  if (!response.ok || resData === null) {
    throw new Error("Failed to fetch Invoices, please try again later");
  }

  return resData;
}

export async function fetchTransactions() {
  const response = await fetch(
    `${firebaseConfig.databaseURL}/mockTransactions.json`
  );
  const resData = await response.json();

  if (!response.ok || resData === null) {
    throw new Error("Failed to fetch Transactions, please try again later");
  }

  return resData;
}

export async function fetchBar() {
  const response = await fetch(
    `${firebaseConfig.databaseURL}/mockBarData.json`
  );
  const resData = await response.json();

  if (!response.ok || resData === null) {
    throw new Error("Failed to fetch Bar Data, please try again later");
  }

  return resData;
}

export async function fetchPie() {
  const response = await fetch(
    `${firebaseConfig.databaseURL}/mockPieData.json`
  );
  const resData = await response.json();

  if (!response.ok || resData === null) {
    throw new Error("Failed to fetch Pie Data, please try again later");
  }

  return resData;
}

export async function fetchLine() {
  const response = await fetch(
    `${firebaseConfig.databaseURL}/mockLineData.json`
  );
  const resData = await response.json();

  if (!response.ok || resData === null) {
    throw new Error("Failed to fetch Line Data, please try again later");
  }

  return resData;
}

export async function fetchGeography() {
  const response = await fetch(
    `${firebaseConfig.databaseURL}/mockGeographyData.json`
  );
  const resData = await response.json();

  if (!response.ok || resData === null) {
    throw new Error("Failed to fetch Geography Data, please try again later");
  }

  return resData;
}
