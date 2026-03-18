import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Separator } from "@mergeium/ui/components/separator";
import Template from "../Template";

export default function LoginOauthGrant(props: { kcContext: Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;
    const { url, oauth, client } = kcContext;

    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            bodyClassName="oauth"
            headerNode={
                <>
                    {client.attributes.logoUri && <img src={client.attributes.logoUri} />}
                    <p>{client.name ? msg("oauthGrantTitle", advancedMsgStr(client.name)) : msg("oauthGrantTitle", client.clientId)}</p>
                </>
            }
        >
            <div id="kc-oauth" className="space-y-3">
                <h3 className="text-lg font-semibold">{msg("oauthGrantRequest")}</h3>
                <ul className="list-disc space-y-1 pl-6 text-sm">
                    {oauth.clientScopesRequested.map(clientScope => (
                        <li key={clientScope.consentScreenText}>
                            <span>
                                {advancedMsg(clientScope.consentScreenText)}
                                {clientScope.dynamicScopeParameter && (
                                    <>
                                        : <b>{clientScope.dynamicScopeParameter}</b>
                                    </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>

                {client.attributes.policyUri ||
                    (client.attributes.tosUri && (
                        <p className="text-sm text-muted-foreground">
                            {client.name ? msg("oauthGrantInformation", advancedMsgStr(client.name)) : msg("oauthGrantInformation", client.clientId)}
                            {client.attributes.tosUri && (
                                <>
                                    {msg("oauthGrantReview")}
                                    <a href={client.attributes.tosUri} target="_blank" className="underline">
                                        {msg("oauthGrantTos")}
                                    </a>
                                </>
                            )}
                            {client.attributes.policyUri && (
                                <>
                                    {msg("oauthGrantReview")}
                                    <a href={client.attributes.policyUri} target="_blank" className="underline">
                                        {msg("oauthGrantPolicy")}
                                    </a>
                                </>
                            )}
                        </p>
                    ))}

                <Separator />

                <form action={url.oauthAction} method="POST">
                    <input type="hidden" name="code" value={oauth.code} />
                    <div className="flex gap-2">
                        <Button name="accept" id="kc-login" type="submit" size="xl" className="flex-1 w-full">
                            {msgStr("doYes")}
                        </Button>
                        <Button variant="outline" size="xl" className="flex-1 w-full" name="cancel" id="kc-cancel" type="submit">
                            {msgStr("doNo")}
                        </Button>
                    </div>
                </form>
            </div>
        </Template>
    );
}
