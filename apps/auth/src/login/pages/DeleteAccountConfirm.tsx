import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Alert, AlertTitle } from "@mergeium/ui/components/alert";

export default function DeleteAccountConfirm(props: PageProps<Extract<KcContext, { pageId: "delete-account-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, triggered_from_aia } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("deleteAccountConfirm")}>
            <form action={url.loginAction} method="post" className="space-y-4">
                <Alert variant="destructive">
                    <AlertTitle>{msg("irreversibleAction")}</AlertTitle>
                </Alert>
                <p className="text-sm text-muted-foreground">{msg("deletingImplies")}</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>{msg("loggingOutImmediately")}</li>
                    <li>{msg("errasingData")}</li>
                </ul>
                <p className="text-sm font-medium">{msg("finalDeletionConfirmation")}</p>
                <div className="flex gap-2">
                    <Button type="submit" variant="destructive">
                        {msgStr("doConfirmDelete")}
                    </Button>
                    {triggered_from_aia && (
                        <Button type="submit" name="cancel-aia" value="true" variant="outline">
                            {msgStr("doCancel")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
