import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("logoutConfirmTitle")}>
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{msg("logoutConfirmHeader")}</p>
                <form action={url.logoutConfirmAction} method="POST">
                    <input type="hidden" name="session_code" value={logoutConfirm.code} />
                    <Button
                        tabIndex={4}
                        type="submit"
                        name="confirmLogout"
                        id="kc-logout"
                        className="w-full"
                    >
                        {msgStr("doLogout")}
                    </Button>
                </form>
                {!logoutConfirm.skipLink && client.baseUrl && (
                    <Button variant="outline" asChild>
                        <a href={client.baseUrl}>{msg("backToApplication")}</a>
                    </Button>
                )}
            </div>
        </Template>
    );
}
