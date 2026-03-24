import { MouseEvent, useRef, useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";

import Template from "../Template";

export default function SelectOrganization(props: { kcContext: Extract<KcContext, { pageId: "select-organization.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, user } = kcContext;

    const { msg } = i18n;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const organizationInputRef = useRef<HTMLInputElement>(null);

    const onOrganizationClick = (organizationAlias: string) => (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!organizationInputRef.current || !formRef.current) {
            return;
        }

        organizationInputRef.current.value = organizationAlias;
        setIsSubmitting(true);

        if (typeof formRef.current.requestSubmit === "function") {
            formRef.current.requestSubmit();
            return;
        }

        formRef.current.submit();
    };

    const organizations = user.organizations ?? [];

    return (
        <Template kcContext={kcContext} i18n={i18n} headerNode={msg("organization.select")}>
            <form ref={formRef} action={url.loginAction} method="post">
                <div id="kc-user-organizations" className="space-y-3">
                    <div className="space-y-2">
                        {organizations.map(({ alias, name }) => (
                            <Button
                                key={alias}
                                id={`organization-${alias}`}
                                variant="secondary"
                                size="xl"
                                className="w-full"
                                type="button"
                                onClick={onOrganizationClick(alias)}
                                disabled={isSubmitting}
                            >
                                {name ?? alias}
                            </Button>
                        ))}
                    </div>
                </div>
                <input ref={organizationInputRef} type="hidden" name="kc.org" />
            </form>
        </Template>
    );
}
