const API_URL = 'http://localhost:8000/v1';

// Load planets and return as JSON.
async function httpGetPlanets() {
  const respose = await fetch(`${API_URL}/planets`);
  return await respose.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/launches`, {
      method:'post',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(launch),
  
    });
  }catch(err){
      return {
        ok: false,
      }
  }
  
  
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try{
    return await fetch(`${API_URL}/launches/${id}`, {
      method:'delete',
    });
  } catch(err){
    return {
      ok:false,
    }
  }
  
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};