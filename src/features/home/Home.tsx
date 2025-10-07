import Stepper, { Step } from "../../shared/components/Stepper/Stepper";
import HeroAdminSection from "./Hero";

const Home = () => {
  return (
    <div className="">
        <Stepper
          stepLabels={[
            'Hero Section',
            'About Us',
            'Learn Latest Skills ',
            'Achievements Section',
            'Student Wall Section',
            'Blog Management',
            'Centre of Innovation',
            'Useful Links',
            'Centre of Innovation',
          ]}
          initialStep={1}
          onStepChange={(step) => console.log('Step changed to:', step)}
          onFinalStepCompleted={() => console.log('All steps completed!')}
          stepContainerClassName="bg-white"
        >
          <Step >
          <HeroAdminSection />
          </Step>

          <Step>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology</h2>
              <p className="text-gray-600 mb-4">
                Select the technologies you'll be using.
              </p>
              <div className="space-y-3">
                {['React', 'Vue', 'Angular', 'Svelte', 'Next.js'].map((tech) => (
                  <label key={tech} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{tech}</span>
                  </label>
                ))}
              </div>
            </div>
          </Step>

          <Step>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Employee</h2>
              <p className="text-gray-600 mb-4">
                Add team members to your project.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter employee name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter role"
                  />
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Assets & Features</h2>
              <p className="text-gray-600 mb-4">
                Define the assets and features for your project.
              </p>
              <div className="space-y-3">
                {['Authentication', 'Database', 'API Integration', 'File Storage', 'Analytics'].map((feature) => (
                  <label key={feature} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </Step>

          <Step>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Other</h2>
              <p className="text-gray-600 mb-4">
                Any additional information or notes.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={6}
                  placeholder="Enter any additional notes or requirements"
                />
              </div>
            </div>
          </Step>
        </Stepper>
    </div>
  );
};

export default Home;
