(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"0JQN":function(e,t){e.exports={Attributes:{arrival_time:"arrival_time",departure_time:"departure_time"},Pagination:{first:"first",next:"next",prev:"prev",last:"last"}}},Du8b:function(e,t,r){const s=r("kI9E");e.exports=s},"O/gq":function(e,t,r){const{selectArrivalISOs:s,selectDepartureISOs:n}=r("ipIE"),i=e=>null!=e&&""!==e,a=e=>Array.isArray(e)&&!e.filter(Boolean).length,o=(e,t)=>{if(!i(t))return e;const r={"hours|hrs":36e5,"minutes|mins":6e4,"seconds|secs":1e3,"ms|milliseconds":1},s=Object.keys(r).find(e=>new RegExp(t,"i").test(e));if(!i(s))throw new Error("Invalid 'convertTo' value: "+t);return e/r[s]},c=e=>t=>{const{response:r,max:s,convertTo:n,now:i=Date.now()}=t;return e(r).slice(0,s).map(e=>{if(null==n||null==e)return e;const t=new Date(e).valueOf()-i,r=Math.floor(o(t,n));return r>=0?r:0})},l=c(s),u=c(n),h=e=>new Date(e).toISOString(),d=e=>{const t=["tram|light rail|streetcar|trolley","subway|metro|train","rail|commuter|commuter rail","bus|autobus","ferry|boat","cable car","gondola|suspended cable car","funicular"],r=Number(e);if(!i(e)||r>=t.length)return console.warn("Invalid type: "+e),null;if(r==r)return r;const s=t.findIndex(t=>new RegExp(e,"i").test(t));return s>-1?s:null},p=(e,t,r)=>{if(!i(t))return r.warn("API key is missing. Keys available at https://api-v3.mbta.com"),""+e;const s=e.includes("?")?"&":"?";return`${e}${s}api_key=${t}`};e.exports={exists:i,buildUrl:function(e,t,r,s=console){const n="https://api-v3.mbta.com"+e;if(!e)throw new Error("Please provide an endpoint. See https://api-v3.mbta.com/docs/swagger/index.html");if(!t||!Object.keys(t).length)return p(n,r,s);!function(e,t){const{limit:r,offset:s,latitude:n,longitude:a,descending:o,min_time:c,max_time:l,radius:u,route:h,stop:d,sort:p,trip:f}=t,m=t=>t===e;!m("/predictions")&&!m("/schedules")||i(d)||i(f)||i(h)||console.warn('Please include "stop", "trip", or "route"'),m("/shapes")&&!i(h)&&console.warn('Shape requires a "route" param'),i(s)&&!i(r)&&console.warn('"offset" will have no effect without "limit"'),(i(n)&&!i(a)||!i(n)&&i(a))&&console.warn("Latitude and longitude must both be present"),!i(u)||i(n)&&i(a)||console.warn("Radius requires latitude and longitude"),i(o)&&!i(p)&&console.warn('"descending" has no effect without "sort"'),[c,l].forEach(e=>{i(e)&&!/^\d{2}:\d{2}/.test(e)&&console.warn("min_time and max_time format should be HH:MM")})}(e,t);const o=Object.entries(t).map(([e,r])=>{let s;switch(e){case"sort":return t.descending?"sort=-"+r:"sort="+r;case"limit":case"offset":return`page[${e}]=${r}`;case"date":s=[].concat(r).map(h);break;case"route_type":case"type":s=[].concat(r).map(d);break;default:s=r}return!i(s)||a(s)?null:`${e}=${(e=>[].concat(e).filter(Boolean).join(",").replace(/,\s/g,","))(s)}`}).filter(e=>!!e&&!/descending/.test(e)).join("&");return p(`${n}?${o}`,r,s)},isoRegex:/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).000Z/,convertMs:o,convertTimes:c,isEmptyArray:a,normalizeType:d,normalizeDate:h,arrivalsWithConversion:l,departuresWithConversion:u}},UTCl:function(e,t,r){const s=r("vDqi");e.exports=async(e,t=s,r=console)=>{try{const r=await t.get(e);if(!r||!r.data)throw new Error("No data from MBTA");return r.data}catch(e){const{response:t}=e;if(t&&t.data&&t.data.errors){const[e]=t.data.errors;throw r.error(`Error ${e.status||e.code} fetching MBTA data: ${e.detail||"(no details)"}`),e}throw r.error("Error fetching MBTA data:",e.message),e}}},ipIE:function(e,t,r){const{Attributes:s}=r("0JQN"),n=e=>t=>t&&t.data?t.data.map(t=>t.attributes[e]):(console.warn("No response data..."),[]),i=n(s.arrival_time),a=n(s.departure_time);e.exports={selectPage:(e,t)=>(e=>{if(!e)throw new Error("No response, fetch data before accessing this value");if(!e.links)throw new Error('response.links does not exist, "limit" must be in fetch options');return e.links})(t)[e],selectIncluded:(e,t)=>{if(!e)throw new Error("included() requires an MBTA response as an argument");return e.included?e.included.filter(e=>Array.isArray(t)?t.includes(e.type):t===e.type||null==t):(console.warn('response.included does not exist, "include" must be in fetch options'),[])},selectArrivalISOs:i,selectDepartureISOs:a}},kI9E:function(e,t,r){const{buildUrl:s,arrivalsWithConversion:n,departuresWithConversion:i}=r("O/gq"),{selectPage:a,selectIncluded:o}=r("ipIE"),c=r("UTCl"),{Pagination:l}=r("0JQN");e.exports=class{constructor(e,t=c,r=console){this.apiKey=e,this.fetch=t,this.logger=r}async fetchPredictions(e){return this.fetch(s("/predictions",e,this.apiKey,this.logger))}async fetchStops(e){return this.fetch(s("/stops",e,this.apiKey,this.logger))}async fetchTrips(e){return this.fetch(s("/trips",e,this.apiKey,this.logger))}async fetchRoutes(e){return this.fetch(s("/routes",e,this.apiKey,this.logger))}async fetchVehicles(e){return this.fetch(s("/vehicles",e,this.apiKey,this.logger))}async fetchShapes(e){return this.fetch(s("/shapes",e,this.apiKey,this.logger))}async fetchServices(e){return this.fetch(s("/services",e,this.apiKey,this.logger))}async fetchSchedules(e){return this.fetch(s("/schedules",e,this.apiKey,this.logger))}async fetchFacilities(e){return this.fetch(s("/facilities",e,this.apiKey,this.logger))}async fetchLiveFacilities(e){return this.fetch(s("/live-facilities",e,this.apiKey,this.logger))}async fetchAlerts(e){return this.fetch(s("/alerts",e,this.apiKey,this.logger))}async fetchAllRoutes(e){return(await this.fetchRoutes(e)).data.map(e=>{const{short_name:t}=e.attributes;return{...t&&t!==e.id?{short_name:t}:{},id:e.id,long_name:e.attributes.long_name,direction_names:e.attributes.direction_names}})}async fetchStopsByRoute(e){return(await this.fetchStops({route:e})).data.map(e=>({name:e.attributes.name,id:e.id}))}async fetchStopsByName(e,{exact:t}={}){const r=await this.fetchStops(),s=e.trim().toLowerCase();return r.data.filter(e=>t?e.attributes.name.toLowerCase()===s:e.attributes.name.toLowerCase().match(s))}selectArrivals(e,{convertTo:t,now:r}={}){return n({response:e,convertTo:t,now:r})}selectDepartures(e,{convertTo:t,now:r}={}){return i({response:e,convertTo:t,now:r})}selectIncluded(e,t){return o(e,t)}async fetchFirstPage(e){return this.fetch(a(l.first,e))}async fetchNextPage(e){return this.fetch(a(l.next,e))}async fetchPrevPage(e){return this.fetch(a(l.prev,e))}async fetchLastPage(e){return this.fetch(a(l.last,e))}}}}]);