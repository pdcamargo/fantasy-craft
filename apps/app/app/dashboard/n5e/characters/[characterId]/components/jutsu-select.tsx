"use client";

import { parseMarkdown } from "@craft/editorjs";
import {
  Button,
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
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@craft/ui/command";
import { isScreenLg } from "@craft/ui/hooks";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Jutsu } from "app/dashboard/n5e/utils/jutsu-database";

const ConfirmJutsuSelect = NiceModal.create(
  ({ jutsu, onConfirm }: { jutsu: Jutsu; onConfirm: () => void }) => {
    const modal = useModal(ConfirmJutsuSelect);

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
              <DialogTitle>{jutsu.name}</DialogTitle>
            </DialogHeader>

            <div className="text-sm flex flex-col gap-2">
              {jutsu.castingTime && (
                <span>
                  <b>Casting time:</b> {jutsu.castingTime}
                </span>
              )}
              {jutsu.range && (
                <span>
                  <b>Range:</b> {jutsu.range}
                </span>
              )}
              {jutsu.components && (
                <span>
                  <b>Components:</b> {jutsu.components}
                </span>
              )}
              {jutsu.duration && (
                <span>
                  <b>Duration:</b> {jutsu.duration}
                </span>
              )}
            </div>

            <Separator />

            <pre
              className="block m-0 p-0 font-sans text-wrap"
              dangerouslySetInnerHTML={{
                __html: parseMarkdown(jutsu.description),
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

const useConfirmJutsuSelect = () => useModal(ConfirmJutsuSelect);

export type JutsuSelectProps = {
  jutsus: Jutsu[];
  onJutsuSelect?: (jutsu: string) => void;
  heading?: string;
};

export const JutsuSelect = NiceModal.create(
  ({ jutsus, onJutsuSelect, heading }: JutsuSelectProps) => {
    const modal = useModal(JutsuSelect);

    const confirmJutsuSelect = useConfirmJutsuSelect();

    const groupedJutsus = Object.groupBy(jutsus, (item) => item.type);

    const jutsuTabs = Object.entries(groupedJutsus);

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
              <DialogTitle>Jutsu Select ({heading})</DialogTitle>
            </DialogHeader>
            <Tabs>
              <TabsList className="px-0">
                <TabsScrollButton direction="left" />

                {jutsuTabs.map(([type]) => (
                  <TabsTrigger key={type} value={type}>
                    {type.replace("Jutsu", "").trim()}
                  </TabsTrigger>
                ))}

                <TabsScrollButton direction="right" />
              </TabsList>
              {jutsuTabs.map(([type, jutsus], idx) => (
                <TabsContent key={idx} value={type}>
                  <Command>
                    <CommandInput placeholder="Search for a jutsu" />
                    <CommandList>
                      <CommandEmpty>No jutsus found</CommandEmpty>
                      <CommandGroup>
                        {jutsus?.map((jutsu) => (
                          <CommandItem
                            key={jutsu.name}
                            onSelect={(value) => {
                              if (isScreenLg()) {
                                onJutsuSelect?.(value);

                                return;
                              }

                              confirmJutsuSelect.show({
                                jutsu,
                                onConfirm: () => {
                                  onJutsuSelect?.(value);
                                },
                              });
                            }}
                          >
                            {jutsu.name}
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

export const useJutsuSelect = () => useModal(JutsuSelect);
