import { db } from "../utils/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

function getTournamentCollection(tenant) {
  return collection(db, "tenants", tenant, "tournaments");
}

function computeStatus(t) {
  const now = Date.now();
  const start = t.startDate || 0;
  const end = t.endDate || 0;

  if (!start || !end) return "upcoming";
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "completed";
}

export async function getTournaments(tenant) {
  const colRef = getTournamentCollection(tenant);
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      status: computeStatus(data)
    };
  });
}

export async function getTournamentById(tenant, id) {
  const docRef = doc(db, "tenants", tenant, "tournaments", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  return {
    id: snapshot.id,
    ...data,
    status: computeStatus(data)
  };
}

export async function createTournament(tenant, data) {
  const colRef = getTournamentCollection(tenant);
  const docRef = await addDoc(colRef, {
    ...data,
    createdAt: Date.now()
  });
  return docRef.id;
}

export async function updateTournament(tenant, id, data) {
  const docRef = doc(db, "tenants", tenant, "tournaments", id);
  await updateDoc(docRef, data);
}

export async function deleteTournament(tenant, id) {
  const docRef = doc(db, "tenants", tenant, "tournaments", id);
  await deleteDoc(docRef);
}