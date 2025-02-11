import moment from "moment";

const Api= "https://data.etabus.gov.hk/v1/transport/kmb/"

const fetchBusData = async (path) => {
  try{

    const url = `${Api}${path}`
    const res = await fetch(url)
    const data = await res.json();
    const allLineData = data.data
    return allLineData
  }catch(error){
    return null
  }
};

export const fetchAllLineData = async () => {
  const data = await fetchBusData("route")
  return data
};  


export const fetchBusStopData = async (route, direction, service_type) => {
  const data = await fetchBusData(`route-stop/${route}/${direction}/${service_type}`);
  const stop_id = data.map((e) => e.stop);
  
  const timeData = await Promise.all(
    stop_id.map(async (stop_id) => {
      const timeData = await fetchBusStopTime(stop_id, route, service_type);
      return timeData;
    })
  );

  return timeData; // 返回的 timeData 現在會是每個停靠站的數據
};

const fetchBusStopTime = async (stop_id, route, service_type) => {
  const nameData = await fetchBusData(`stop/${stop_id}`);
  const timeData = await fetchBusData(`eta/${stop_id}/${route}/${service_type}`);

const stops = timeData.slice(0, 3).map((eta, index) => ({
    name: nameData.name_tc,
    time: eta ? moment(eta.eta).format("hh:mm:ss a") : "N/A",
    trips: eta ? eta.rmk_tc : "N/A"
  }));
  return stops
};
