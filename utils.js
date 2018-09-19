const conversion = (businesses, latitude, longitude) => {
  if (!businesses) return;
  return businesses.reduce((acc, business) => {
    business.position = transformPointToAR(
      latitude,
      longitude,
      business.coordinates.latitude,
      business.coordinates.longitude
    );
    acc[business.id] = business;
    return acc;
  }, {});
};

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

module.exports = { conversion, latLongToMerc, transformPointToAR };
