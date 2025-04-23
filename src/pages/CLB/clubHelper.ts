export interface Club {
    id: string;
    name: string;
    establishedDate: string;
    description: string;
    president: string;
    isActive: boolean;
    avatarUrl?: string;
    members: string[];
  }
  
  // Service xử lý localStorage
  const STORAGE_KEY = 'clubs';
  
  export const getClubs = (): Club[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };
  
  export const saveClubs = (clubs: Club[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clubs));
  };
  
  export const addOrUpdateClub = (club: Club) => {
    const clubs = getClubs();
    const index = clubs.findIndex(c => c.id === club.id);
    if (index > -1) {
      clubs[index] = club;
    } else {
      clubs.push(club);
    }
    saveClubs(clubs);
  };
  
  export const deleteClub = (id: string) => {
    const clubs = getClubs().filter(c => c.id !== id);
    saveClubs(clubs);
  };
  
  export const getClubById = (id: string): Club | undefined => {
    return getClubs().find(c => c.id === id);
  };
  
  // Optional: Model state nếu muốn dùng useModel
  export default {
    state: {
      clubs: [] as Club[],
    },
    reducers: {
      setClubs(state: any, payload: Club[]) {
        return { ...state, clubs: payload };
      },
    },
    effects: {
        *fetchClubs(_: any, { put }: any) {
            const clubs = getClubs(); 
            yield put({ type: 'setClubs', payload: clubs });
        }          
    },
  };
  