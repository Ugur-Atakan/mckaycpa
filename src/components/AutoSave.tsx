import { useEffect, useRef } from 'react';

interface Props {
  data: any;
  onSave: () => Promise<void>;
  interval?: number;
}

export function AutoSave({ data, onSave, interval = 30000 }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSaved = useRef(data);

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(lastSaved.current)) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          await onSave();
          lastSaved.current = data;
        } catch (error) {
          console.error('AutoSave failed:', error);
        }
      }, interval);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, interval]);

  return null;
}