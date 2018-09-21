const latLongToMerc = (lat, long) => {
  const lon_rad = (long / 180.0) * Math.PI;
  const lat_rad = (lat / 180.0) * Math.PI;
  const sm_a = 6378137.0;
  const xmeters = sm_a * lon_rad;
  const ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad));
  return { x: xmeters, y: ymeters };
};

const transformPointToAR = (
  deviceLat,
  deviceLong,
  businessLat,
  businessLong
) => {
  const objPoint = latLongToMerc(businessLat, businessLong);
  const devicePoint = latLongToMerc(deviceLat, deviceLong);
  const objFinalPosZ = objPoint.y - devicePoint.y;
  const objFinalPosX = objPoint.x - devicePoint.x;
  return [objFinalPosX, 0, -objFinalPosZ];
};

const conversion = (businesses, latitude, longitude) => {
  if (!businesses) return;
  return businesses.reduce((acc, business) => {
    business.position = transformPointToAR(
      latitude,
      longitude,
      business.coordinates.latitude,
      business.coordinates.longitude
    );
    const categories = business.categories.map(category => {
      return category.title;
    });
    acc[business.id] = {
      id: business.id,
      name: business.name,
      rating: business.rating * 2,
      position: business.position,
      price: business.price,
      distance: Math.floor(business.distance),
      categories: categories.slice(0, 3)
    };
    return acc;
  }, {});
};

const formatHours = hoursData => {
  const array = Array.from({ length: 7 }, (val, i) => 'Closed')
  hoursData.forEach((day, i) => {
    array[day.day] = `${day.start.slice(0, 2)}:${day.start.slice(2)} - ${day.end.slice(0, 2)}:${day.end.slice(2)}`
  });
  return array
};

module.exports = { formatHours, conversion, transformPointToAR, latLongToMerc}