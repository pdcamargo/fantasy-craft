"use client";

import {
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
  DialogHeader,
  DialogPortal,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@craft/ui";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Feat } from "app/dashboard/n5e/utils/feat-database";
import React from "react";

export type FeatSelectProps = {
  feats: Feat[];
  onFeatSelect?: (feat: string) => void;
};

export const FeatSelect = NiceModal.create(
  ({ feats, onFeatSelect }: FeatSelectProps) => {
    const modal = useModal(FeatSelect);

    const groupedFeats = Object.groupBy(feats, (item) => item.type);

    const featTabs = Object.entries(groupedFeats);

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
              <TabsList>
                {featTabs.map(([type]) => (
                  <TabsTrigger key={type} value={type}>
                    {type.replace("Feat", "").trim()}
                  </TabsTrigger>
                ))}
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
                              onFeatSelect?.(value);
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
