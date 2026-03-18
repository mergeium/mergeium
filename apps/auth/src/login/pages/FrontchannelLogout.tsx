import { useEffect, useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Separator } from "@mergeium/ui/components/separator";
import Template from "../Template";

export default function FrontchannelLogout(props: { kcContext: Extract<KcContext, { pageId: "frontchannel-logout.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { logout } = kcContext;

    const { msg, msgStr } = i18n;

    const [iframeLoadCount, setIframeLoadCount] = useState(0);

    useEffect(() => {
        if (!kcContext.logout.logoutRedirectUri) {
            return;
        }

        if (iframeLoadCount !== kcContext.logout.clients.length) {
            return;
        }

        window.location.replace(kcContext.logout.logoutRedirectUri);
    }, [iframeLoadCount]);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            documentTitle={msgStr("frontchannel-logout.title")}
            headerNode={msg("frontchannel-logout.title")}
        >
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{msg("frontchannel-logout.message")}</p>
                <Separator />
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {logout.clients.map(client => (
                        <li key={client.name}>
                            {client.name}
                            <iframe
                                src={client.frontChannelLogoutUrl}
                                style={{ display: "none" }}
                                onLoad={() => {
                                    setIframeLoadCount(count => count + 1);
                                }}
                            />
                        </li>
                    ))}
                </ul>
                {logout.logoutRedirectUri !== undefined && (
                    <Button asChild>
                        <a id="continue" href={logout.logoutRedirectUri}>
                            {msg("doContinue")}
                        </a>
                    </Button>
                )}
            </div>
        </Template>
    );
}
