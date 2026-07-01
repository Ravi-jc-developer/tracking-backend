
export const getDistanceInMeters = (p1, p2) => {
    const R = 6371000;

    const toRad = d => (d * Math.PI) / 180;
    
    const dLat = toRad(p2.lat - p1.lat);
    const dLng = toRad(p2.lng - p1.lng);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(p1.lat)) *
        Math.cos(toRad(p2.lat)) *
        Math.sin(dLng / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const calculateTotalDistance = (path) => {
    return path.reduce((sum, point, i) => {
        if (i === 0) return sum;

        return sum + getDistanceInMeters(path[i - 1], point);
    }, 0);
};