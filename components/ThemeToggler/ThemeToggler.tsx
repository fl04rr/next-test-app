import { IconSun, IconMoon } from '@tabler/icons-react';
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
export default function ThemeToggler(){
    
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    
    return(
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
        >
            {computedColorScheme === 'light' ? <IconSun  stroke={1.5} /> : <IconMoon  stroke={1.5} />}
        </ActionIcon>
    );
}