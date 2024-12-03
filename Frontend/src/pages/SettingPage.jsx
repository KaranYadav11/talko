import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";

import { useState, useEffect } from "react";

const SettingPage = () => {
  // State for managing theme and dark mode
  const [theme, setTheme] = useState(() => {
    localStorage.getItem("theme") || "";
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On initial load, check localStorage for saved theme and dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "";
    const savedDarkMode = localStorage.getItem("darkMode") === "true";

    setTheme(savedTheme);
    setIsDarkMode(savedDarkMode);

    // Apply theme and dark mode from localStorage
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Function to handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Store selected theme in localStorage
  };

  // Function to toggle dark mode
  const handleDarkModeToggle = (checked) => {
    const newDarkModeState = checked;
    setIsDarkMode(newDarkModeState);

    if (newDarkModeState) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", newDarkModeState); // Store dark mode state in localStorage
  };

  return (
    <div className="bg-background min-h-screen text-foreground flex items-center justify-center ">
      <div className="container  px-[5%] sm:px-[30%] mx-auto min-h-[80vh] flex space-y-28 justify-center flex-col">
        <div className="bg-background w-full py-2 px-1  flex items-center justify-center ">
          <div className="flex items-center w-full justify-between">
            <Label className="block text-primary font-main text-2xl">
              Dark Mode
            </Label>
            <Switch
              checked={isDarkMode}
              onCheckedChange={(checked) => handleDarkModeToggle(checked)}
              className="bg-secondary/20 "
            />
          </div>
        </div>

        <div className="bg-background w-full py-2 px-1  flex items-center justify-center ">
          <div className="flex items-center w-full justify-between">
            <Label className="block text-primary font-main text-2xl">
              Themes
            </Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={`${theme ? theme : "Select a theme"}`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Themes</SelectLabel>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="blue">Blue </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-background w-full py-2 px-1  flex items-center justify-center ">
          <div className="flex items-center w-full justify-between">
            <Label className="block text-primary font-main text-2xl">
              Gradients
            </Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={`${theme ? theme : "Select a gradient"}`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gradients</SelectLabel>
                  <SelectItem value="lavender">Lavender</SelectItem>
                  <SelectItem value="purple-haze">Purple Haze</SelectItem>
                  <SelectItem value="pink">Pink</SelectItem>
                  <SelectItem value="peach">Peach</SelectItem>
                  <SelectItem value="ember">Smoky Ember</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
