import { Aside } from "../components/Aside";
import "../styles/courseCreation.css";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/NavBar";
import CourseCreationModuleForm from "../assets/courseCreation_components/courseCreation_moduleForm";

const CourseCreationModule = () => {
  return (
    <div>
      <Navbar userName="Test" />
      <div className="flex flex-row">
        <div className="mt-4">
          <Aside />
        </div>
        <div id="dvs-header" className="pt-10 mt-8 pl-12 w-full items-center justify-center">
          <CourseCreationModuleForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseCreationModule;