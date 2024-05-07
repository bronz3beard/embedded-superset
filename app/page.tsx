"use client";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { singleGetRequest } from "@/utils/requestHelpers";
import { SUPERSET_URL, REPORT_ID, endPoint } from "./constants";

async function fetchGuestTokenFromBackend(id: string): Promise<string> {
  const response = await singleGetRequest<string>(
    `${endPoint}/superset/report?id=${id}`
  );

  return response;
}

export default function Home() {
  const [isLoadingIframe, setIsLoadingIframe] = useState<boolean>(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(function mountSuperSetReport() {
    setIsLoadingIframe(true);
    const superSetReportIframe = async () => {
      if (iframeContainerRef.current) {
        await embedDashboard({
          id: REPORT_ID,
          supersetDomain: SUPERSET_URL,
          mountPoint: iframeContainerRef.current, // any html element that can contain an iframe
          fetchGuestToken: () => fetchGuestTokenFromBackend(REPORT_ID),
          dashboardUiConfig: {
            // dashboard UI config: hideTitle, hideTab, hideChartControls, filters.visible, filters.expanded (optional)
            hideTitle: true,
            filters: {
              expanded: false,
            },
          },
          debug: true,
        });

        // NOTE:: styling for the iframe must go here to await the creation of the iframe before adding styles
        iframeContainerRef.current.children[0].className =
          "z-0 m-0 h-full w-full flex-grow select-none border-none p-0";
        setIsLoadingIframe(false);
      }
    };
    superSetReportIframe();

    return () => {
      superSetReportIframe();
    };
  }, []);

  return (
    <PageLayout>
      {isLoadingIframe ? <div>Loading...</div> : null}
      <div
        ref={iframeContainerRef}
        className={`flex h-full w-full flex-col pb-0 ${
          isLoadingIframe ? "hidden" : ""
        }`}
        id="superset-container"
      ></div>
    </PageLayout>
  );
}
