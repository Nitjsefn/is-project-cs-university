//import type Context from "../support/Context";
import { useState } from "react";
import Chart from "../pages/Chart";
import { RadioGroup } from "@mui/material";

export default function Overview(props: {token: string}) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [type, setType] = useState("yaml");

    const [language, setLanguage] = useState("Java");

    const download = async () => {
        const headers = new Headers();
        //curl http://localhost:3000/api/v1/soap/export   -H "Content-Type: text/xml;charset=UTF-8"   -H "SOAPAction: exportCVEs"   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzUwMDc3Mzc3LCJleHAiOjE3NTAwODA5Nzd9.eyEAtEJlOkUXAKOY49ADZiZYyQN1fAp5iSW0-2Uzk18"   -d @request.xml
        headers.append("Content-Type", "text/xml;charset=UTF-8");
        headers.append("SOAPAction", "exportCVEs");
        headers.append("Authorization", "Bearer " + props.token);
        const res = await fetch("http://localhost:3000/api/v1/soap/export", {
            method: "POST",
            mode: "cors",
            //credentials: "include",
            headers: headers,
            body: `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:exp="http://example.com/export">
  <soapenv:Header/>
  <soapenv:Body>
    <exp:exportCVEs>
      <limit></limit>
      <format>${type}</format>
    </exp:exportCVEs>
  </soapenv:Body>
</soapenv:Envelope>`
        });

        let dataEncoded = await res.text();
        let start = 0;
        while(dataEncoded[start] != '\n')
            start++;
        start++;
        let stop = dataEncoded.length - 1;
        while(dataEncoded[stop] != '\n')
            stop--;
        dataEncoded = dataEncoded.slice(start, stop);
        const el = document.createElement("a");
        el.innerHTML = dataEncoded;
        const data = el.innerText;
        el.innerHTML = "";
        el.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
        el.setAttribute("download", "cves." + type);
        el.style.display = 'none';
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    }

    if(props.token.length <= 0)
        return (
            <div>
                <span>You are not logged in. To view data you have to be logged in</span>
            </div>
        );

    return (
        <div>
            <div style={{background:"white", color: "black"}}>
                <Chart startDate= {startDate} endDate={endDate} token={props.token}  language={language} />
            </div>


            <fieldset title="Chart">

	            <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="Lua">JavaScript</option>
          <option value="JavaScript">C++</option>
        </select>
	<br/>




                <legend>Chart</legend>
                <label htmlFor="chart_start_date">Start:</label>
                <input id="chart_start_date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <br />
                <label htmlFor="chart_end_date">End:</label>
                <input id="chart_end_date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={() => show()}>Show</button>
            </fieldset>


            <fieldset title="Download" className="text-left">
                <legend>Download</legend>
                <RadioGroup>
                    <label htmlFor="download_yaml_rb">YAML</label>
                    <input className="inline w-min" id="download_yaml_rb" type="radio" checked={type == "yaml"} onChange={() => setType("yaml")} />
                    <label htmlFor="download_xml_rb">XML</label>
                    <input className="inline w-min" id="download_xml_rb" type="radio" checked={type == "xml"} onChange={() => setType("xml")} />
                </RadioGroup>
                <button onClick={() => download()}>Download</button>
            </fieldset>
        </div>
    );
}
