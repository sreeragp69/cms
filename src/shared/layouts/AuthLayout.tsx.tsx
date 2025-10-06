import { Outlet, Link } from "react-router-dom";
import ThemeTogglerTwo from "../components/ThemeToggler/ThemeToggler";
import { useTheme } from "../../Context/ThemeContext";
import { WavyBackground } from "../components/ui/wavy-background";

export default function AuthLayout() {
  const { theme } = useTheme();
  return (
    <div className="">
      <WavyBackground waveWidth={100} className="w-full">
        <div className="grid w-full!  min-h-screen grid-cols-1 md:grid-cols-2">
          <aside className="relative hidden overflow-hidden md:block -3  rounded-br-3xl rounded-tr-3xl ">
            <div className="flex items-center justify-center bg-red">
              {/* <img
                src="/images/login.png"
                alt="Astronaut exploring a new planet"
                className={`${
                  theme === "dark" ? "hidden" : "blur-3xl"
                } absolute inset-0  w-full object-cover "`}
              /> */}
            </div>
          </aside>

          {/* Right Content Panel */}
          <main className="relative bg-transparent  flex items-center justify-center p-6 md:p-10 ">
            <div className="w-full max-w-md rounded-2xl bg-transparent dark:bg-  p-6 ">
              <Outlet />
            </div>
          </main>
          <div className="fixed z-50 bottom-6 right-6 ">
            <ThemeTogglerTwo />
          </div>
        </div>
      </WavyBackground>
    </div>
  );
}
