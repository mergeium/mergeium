import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";

export default function Error(props: { kcContext: Extract<KcContext, { pageId: "error.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div className="space-y-3">
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <p className="text-center text-sm text-muted-foreground">
                        <a href={client.baseUrl} className="underline hover:text-foreground">{msg("backToApplication")}</a>
                    </p>
                )}
            </div>
        </Template>
    );
}
