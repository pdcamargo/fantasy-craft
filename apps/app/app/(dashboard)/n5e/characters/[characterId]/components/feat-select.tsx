"use client";

import { parseMarkdown } from "@craft/editorjs";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsScrollButton,
  TabsTrigger,
} from "@craft/ui";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Feat } from "app/(dashboard)/n5e/utils/feat-database";
import React from "react";

export type FeatSelectProps = {
  feats: Feat[];
  onFeatSelect?: (feat: string) => void;
};

const ConfirmFeatSelect = NiceModal.create(
  ({ feat, onConfirm }: { feat: Feat; onConfirm: () => void }) => {
    const modal = useModal(ConfirmFeatSelect);

    return (
      <Dialog
        open={modal.visible}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            modal.hide();
            return;
          }

          modal.show();
        }}
      >
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{feat.name}</DialogTitle>
            </DialogHeader>

            <div className="text-sm flex flex-col gap-2">
              {feat.preRequisite && (
                <span>
                  <b>Prerequisite:</b> {feat.preRequisite}
                </span>
              )}
              <span>{feat.type}</span>
            </div>

            <Separator />

            <pre
              className="block m-0 p-0 font-sans text-wrap"
              dangerouslySetInnerHTML={{
                __html: parseMarkdown(feat.description),
              }}
            />

            <DialogFooter className="flex flex-row w-full flex-1 items-center gap-5 justify-between border-t border-white/10 pt-4">
              <Button variant="secondary" onClick={modal.hide}>
                Cancel
              </Button>

              <Button
                variant="default"
                onClick={() => {
                  onConfirm();

                  modal.hide();
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  },
);

const useConfirmFeatSelect = () => useModal(ConfirmFeatSelect);

export const FeatSelect = NiceModal.create(
  ({ feats, onFeatSelect }: FeatSelectProps) => {
    const modal = useModal(FeatSelect);

    const confirmModal = useConfirmFeatSelect();

    const groupedFeats = Object.groupBy(feats, (item) => item.type) as Record<
      string,
      Feat[]
    >;

    groupedFeats["All"] = feats;

    const featTabs = Object.entries(groupedFeats).sort(([a], [b]) => {
      // All should always be first, then general feats, then the rest
      if (a === "All") return -1;

      if (a === "General Feat") return -1;

      if (b === "General Feat") return 1;

      return a.localeCompare(b);
    });

    return (
      <Dialog
        open={modal.visible}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            modal.hide();
            return;
          }

          modal.show();
        }}
      >
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Feat Select</DialogTitle>
            </DialogHeader>
            <Tabs>
              <TabsList className="px-0">
                <TabsScrollButton direction="left" />
                {featTabs.map(([type]) => (
                  <TabsTrigger key={type} value={type}>
                    {type.replace("Feat", "").trim()}
                  </TabsTrigger>
                ))}
                <TabsScrollButton direction="right" />
              </TabsList>
              {featTabs.map(([type, feats], idx) => (
                <TabsContent key={idx} value={type}>
                  <Command>
                    <CommandInput placeholder="Search for a feat" />
                    <CommandList>
                      <CommandEmpty>No feats found</CommandEmpty>
                      <CommandGroup>
                        {feats?.map((feat) => (
                          <CommandItem
                            key={feat.name}
                            onSelect={(value) => {
                              confirmModal.show({
                                feat,
                                onConfirm: () => {
                                  onFeatSelect?.(value);

                                  modal.hide();
                                },
                              });
                            }}
                          >
                            {feat.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </TabsContent>
              ))}
            </Tabs>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  },
);

export const useFeatSelect = () => useModal(FeatSelect);
