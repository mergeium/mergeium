import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";

export default function LoginIdpLinkEmail(props: { kcContext: Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
        >
            <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
                </p>
                <p className="text-sm text-muted-foreground">
                    {msg("emailLinkIdp2")}{" "}
                    <a className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" href={url.loginAction}>
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp3")}
                </p>
                <p className="text-sm text-muted-foreground">
                    {msg("emailLinkIdp4")}{" "}
                    <a className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" href={url.loginAction}>
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp5")}
                </p>
            </div>
        </Template>
    );
}
