'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DiscountTier {
  amount: number;
  discount: number;
}

export interface CustomPlanSettings {
    minDurationDays: number;
    discountTiers: DiscountTier[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialLink {
    id: string;
    name: string;
    url: string;
    enabled: boolean;
}

interface AppSettingsContextType {
  isDirectOrderingEnabled: boolean;
  setDirectOrderingEnabled: (enabled: boolean) => void;
  showPreparationTime: boolean;
  setShowPreparationTime: (show: boolean) => void;
  isCustomPlanEnabled: boolean;
  setCustomPlanEnabled: (enabled: boolean) => void;
  customPlanSettings: CustomPlanSettings;
  setCustomPlanSettings: (settings: CustomPlanSettings) => void;
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isDirectOrderingEnabled, setDirectOrderingEnabled] = useState(true);
  const [showPreparationTime, setShowPreparationTime] = useState(true);
  const [isCustomPlanEnabled, setCustomPlanEnabled] = useState(true);
  const [customPlanSettings, setCustomPlanSettings] = useState<CustomPlanSettings>({
      minDurationDays: 7,
      discountTiers: [
          { amount: 200, discount: 10 },
          { amount: 400, discount: 15 },
      ]
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'contact@dinneroclock.com',
    phone: '+1 (234) 567-890',
    address: '123 Foodie Lane, Flavor Town, 12345',
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
      { id: 'fb', name: 'Facebook', url: 'https://facebook.com', enabled: true },
      { id: 'tw', name: 'Twitter', url: 'https://twitter.com', enabled: true },
      { id: 'ig', name: 'Instagram', url: 'https://instagram.com', enabled: true },
      { id: 'yt', name: 'YouTube', url: 'https://youtube.com', enabled: false },
      { id: 'li', name: 'LinkedIn', url: 'https://linkedin.com', enabled: true },
      { id: 'gh', name: 'GitHub', url: '#', enabled: true },
  ]);


  return (
    <AppSettingsContext.Provider value={{ 
        isDirectOrderingEnabled, setDirectOrderingEnabled, 
        showPreparationTime, setShowPreparationTime,
        isCustomPlanEnabled, setCustomPlanEnabled,
        customPlanSettings, setCustomPlanSettings,
        contactInfo, setContactInfo,
        socialLinks, setSocialLinks,
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
