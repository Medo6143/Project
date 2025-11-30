import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, increment } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';

// Your web app's Firebase configuration (public keys for web apps)
const firebaseConfig = {
  apiKey: 'AIzaSyDwHMG6xp2jij5v36NnpCJuGMkaI_phepE',
  authDomain: 'chatnme-fb12d.firebaseapp.com',
  projectId: 'chatnme-fb12d',
  storageBucket: 'chatnme-fb12d.appspot.com',
  messagingSenderId: '695405548300',
  appId: '1:695405548300:web:377c06a18c521d33b1af29',
  measurementId: 'G-Q23E2TV7GR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Categories
export async function getCategories(): Promise<any[]> {
  const snap = await getDocs(query(collection(db, 'categories'), orderBy('order', 'asc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Products
export async function getProducts(filters?: { origin?: string; category_id?: string }): Promise<any[]> {
  const col = collection(db, 'products');
  const constraints: any[] = [];
  if (filters?.origin) constraints.push(where('origin', '==', filters.origin));
  if (filters?.category_id) constraints.push(where('category_id', '==', filters.category_id));
  // Order featured first, then newest - if you don't have these fields, Firestore can't order by multiple unless indexed.
  // We'll just order by created_at desc if exists; otherwise fallback to none.
  let q = constraints.length ? query(col, ...constraints) : query(col);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductsByCategory(categoryId: string): Promise<any[]> {
  return getProducts({ category_id: categoryId });
}

export async function insertProduct(productData: any) {
  const docRef = await addDoc(collection(db, 'products'), {
    ...productData,
    views_count: 0,
    add_to_cart_count: 0,
    created_at: new Date().toISOString(),
  });
  return { id: docRef.id, ...productData };
}

export async function updateProduct(id: string, productData: any) {
  await updateDoc(doc(db, 'products', id), productData);
  return { id, ...productData };
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, 'products', id));
  return true;
}

export async function incrementProductMetric(id: string, field: 'views_count' | 'add_to_cart_count') {
  await updateDoc(doc(db, 'products', id), { [field]: increment(1) });
}

// Orders
export async function createOrder(orderData: any) {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...orderData,
    created_at: new Date().toISOString(),
  });
  return { id: docRef.id, ...orderData };
}

export function onAuth(cb: (user: any) => void) {
  return onAuthStateChanged(auth, cb);
}

export async function signIn(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOut() {
  await fbSignOut(auth);
}
