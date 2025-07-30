import { ProjectGallery } from '@/components/projects/project-gallery';

export default function ProjectsPage() {
  return (
    <div>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Our Projects
          </h1>
          <p className="text-lg text-gray-600 text-center mt-4 max-w-2xl mx-auto">
            Discover our collection of custom luxury furniture pieces
          </p>
        </div>
      </div>
      
      <ProjectGallery />
    </div>
  );
}
