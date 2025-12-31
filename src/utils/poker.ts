
export const SYSTEM_CLUB_ID = "the-poker-tour";
export const CHECKIN_RADIUS_KM = 0.5;

export interface Game {
  day: number;
  time: string;
  checkInOpen?: number;
  checkInClose?: number;
}

export interface Venue {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  isRetired?: boolean;
  games: Game[];
}

export const getDenverNow = () => {
    const now = new Date();
    const denverStr = now.toLocaleString("en-US", {timeZone: "America/Denver", hour12: false});
    const [datePart, timePart] = denverStr.split(', ');
    const [month, day, year] = datePart.split('/').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
};

export const getMajorTournamentDetails = (dateInput = new Date()) => {
    const d = new Date(dateInput);
    const year = d.getFullYear();
    const getNthSaturday = (y: number, m: number, n: number) => {
        let count = 0;
        let date = new Date(y, m, 1);
        while (count < n && date.getMonth() === m) {
            if (date.getDay() === 6) {
                count++;
                if (count === n) return new Date(date);
            }
            date.setDate(date.getDate() + 1);
        }
        return date;
    };
    
    const majors = [
        { id: 'spring', label: 'Spring Tournament', date: getNthSaturday(year, 3, 1) }, 
        { id: 'summer', label: 'Summer Tournament', date: getNthSaturday(year, 7, 1) }, 
        { id: 'winter', label: 'Winter Tournament', date: getNthSaturday(year, 11, 2) } 
    ];

    majors.forEach(m => m.date.setHours(23, 59, 59, 999));
    let target = majors.find(m => m.date >= d);
    if (!target) {
        target = { id: 'spring', label: 'Spring Tournament', date: getNthSaturday(year + 1, 3, 1) };
        target.date.setHours(23, 59, 59, 999);
    }
    const seasonKey = `${target.date.getFullYear()}_${target.id}`;
    return { ...target, seasonKey };
};

export const formatName = (name?: string) => {
  if (!name) return 'Anonymous';
  if (name.includes('(Walk-In)')) return name;
  const parts = name.trim().split(/\s+/);
  const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  if (parts.length > 1) return `${firstName} ${parts[parts.length - 1].charAt(0).toUpperCase()}`;
  return firstName;
};

export const formatTimeMMSS = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return 999;
  const R = 6371; 
  const dLat = (lat2-lat1) * (Math.PI/180);
  const dLon = (lon2-lon1) * (Math.PI/180); 
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
};

export const isGameActive = (venue?: Venue) => {
    if (!venue || !venue.games || venue.isRetired) return { active: false, gameTime: null };
    const denverNow = getDenverNow();
    const day = denverNow.getDay();
    const currentVal = (denverNow.getHours() * 60) + denverNow.getMinutes();
    const todaysGames = venue.games.filter(g => g.day === day);
    for (const game of todaysGames) {
        if (!game.time) continue;
        const [h, m] = game.time.split(':').map(Number);
        const gameVal = (h * 60) + m;
        const openOffset = (game.checkInOpen ?? 2) * 60;
        const closeOffset = (game.checkInClose ?? 2) * 60;
        if (currentVal >= gameVal - openOffset && currentVal <= gameVal + closeOffset) {
            return { active: true, gameTime: game.time };
        }
    }
    return { active: false, gameTime: null };
};

export const compressImage = (file: File, maxWidth = 512): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width; let height = img.height;
        if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
        canvas.width = Math.floor(width); canvas.height = Math.floor(height);
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, Math.floor(width), Math.floor(height));
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};
