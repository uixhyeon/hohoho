import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'archives';

// 아카이브 생성
export const createArchive = async (archiveData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...archiveData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { id: docRef.id, ...archiveData };
  } catch (error) {
    console.error('Error creating archive:', error);
    throw error;
  }
};

// 모든 아카이브 조회
export const getAllArchives = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting archives:', error);
    throw error;
  }
};

// 카테고리별 아카이브 조회
export const getArchivesByCategory = async (category) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting archives by category:', error);
    throw error;
  }
};

// 아카이브 단일 조회
export const getArchiveById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Archive not found');
    }
  } catch (error) {
    console.error('Error getting archive:', error);
    throw error;
  }
};

// 아카이브 수정
export const updateArchive = async (id, archiveData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...archiveData,
      updatedAt: Timestamp.now()
    });
    return { id, ...archiveData };
  } catch (error) {
    console.error('Error updating archive:', error);
    throw error;
  }
};

// 아카이브 삭제
export const deleteArchive = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return id;
  } catch (error) {
    console.error('Error deleting archive:', error);
    throw error;
  }
};

// 검색
export const searchArchives = async (searchTerm) => {
  try {
    const allArchives = await getAllArchives();
    return allArchives.filter(archive =>
      archive.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      archive.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      archive.code?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching archives:', error);
    throw error;
  }
};
