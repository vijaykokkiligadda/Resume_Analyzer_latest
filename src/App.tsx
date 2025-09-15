import React, { useState } from 'react';
import { Upload, FileText, User, Brain, TrendingUp, Database, X, Eye, Calendar, Mail, Phone, MapPin } from 'lucide-react';

interface ResumeData {
  id?: string;
  filename: string;
  uploadDate: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  coreSkills: string[];
  softSkills: string[];
  workExperience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  resumeRating: number;
  improvementAreas: string;
  upskillSuggestions: string;
  certifications?: string[];
  languages?: string[];
}

const mockHistoricalData: ResumeData[] = [
  {
    id: '1',
    filename: 'john_doe_resume.pdf',
    uploadDate: '2024-01-15',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1-234-567-8900',
    location: 'San Francisco, CA',
    coreSkills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
    softSkills: ['Leadership', 'Problem Solving', 'Communication', 'Team Collaboration'],
    workExperience: [
      {
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        duration: '2022-Present',
        description: 'Led development of scalable web applications using React and Node.js'
      }
    ],
    education: [
      {
        institution: 'Stanford University',
        degree: 'Master of Computer Science',
        year: '2020'
      }
    ],
    resumeRating: 8.5,
    improvementAreas: 'Consider adding more quantifiable achievements and metrics to demonstrate impact.',
    upskillSuggestions: 'Machine Learning, Kubernetes, GraphQL for current tech trends',
    certifications: ['AWS Solutions Architect', 'Google Cloud Professional'],
    languages: ['English (Native)', 'Spanish (Conversational)']
  },
  {
    id: '2',
    filename: 'sarah_smith_cv.pdf',
    uploadDate: '2024-01-10',
    name: 'Sarah Smith',
    email: 'sarah.smith@email.com',
    phone: '+1-987-654-3210',
    location: 'New York, NY',
    coreSkills: ['Java', 'Spring Boot', 'MySQL', 'Microservices', 'Jenkins'],
    softSkills: ['Analytical Thinking', 'Adaptability', 'Mentoring'],
    workExperience: [
      {
        company: 'Enterprise Solutions Inc',
        position: 'Backend Developer',
        duration: '2021-Present',
        description: 'Developed enterprise-level backend systems and APIs'
      }
    ],
    education: [
      {
        institution: 'MIT',
        degree: 'Bachelor of Computer Science',
        year: '2021'
      }
    ],
    resumeRating: 7.2,
    improvementAreas: 'Add more frontend technologies and full-stack project examples.',
    upskillSuggestions: 'React, Cloud platforms (AWS/Azure), DevOps practices',
    certifications: ['Oracle Java Certified'],
    languages: ['English (Native)', 'French (Basic)']
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ResumeData | null>(null);
  const [selectedResume, setSelectedResume] = useState<ResumeData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setUploadedFile(file);
        processResume(file);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      processResume(file);
    }
  };

  const processResume = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      const mockData: ResumeData = {
        filename: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        name: 'Sample User',
        email: 'sample.user@email.com',
        phone: '+1-555-0123',
        location: 'Seattle, WA',
        coreSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'REST APIs'],
        softSkills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Time Management'],
        workExperience: [
          {
            company: 'Tech Innovation Labs',
            position: 'Full Stack Developer',
            duration: '2022-Present',
            description: 'Developed and maintained web applications using modern JavaScript frameworks'
          },
          {
            company: 'Digital Solutions Co',
            position: 'Frontend Developer',
            duration: '2020-2022',
            description: 'Created responsive user interfaces and improved user experience'
          }
        ],
        education: [
          {
            institution: 'University of Washington',
            degree: 'Bachelor of Science in Computer Science',
            year: '2020'
          }
        ],
        projects: [
          {
            name: 'E-commerce Platform',
            description: 'Built a full-stack e-commerce solution with payment integration',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe']
          }
        ],
        resumeRating: 7.8,
        improvementAreas: 'Consider adding more specific metrics and achievements. Include leadership experience and open-source contributions to strengthen your profile.',
        upskillSuggestions: 'Consider learning TypeScript for better code maintainability, exploring cloud platforms like AWS or Azure, and diving into modern DevOps practices like Docker and CI/CD pipelines.',
        certifications: ['AWS Cloud Practitioner'],
        languages: ['English (Native)', 'Spanish (Intermediate)']
      };
      
      setExtractedData(mockData);
      setIsProcessing(false);
    }, 3000);
  };

  const openModal = (resume: ResumeData) => {
    setSelectedResume(resume);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedResume(null);
  };

  const ResumeDataDisplay = ({ data }: { data: ResumeData }) => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{data.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{data.email}</span>
          </div>
          {data.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{data.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.coreSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.softSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Rating */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Resume Rating</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${(data.resumeRating / 10) * 100}%` }}
            />
          </div>
          <span className="text-2xl font-bold text-gray-900">{data.resumeRating}/10</span>
        </div>
      </div>

      {/* Work Experience */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
        <div className="space-y-4">
          {data.workExperience.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                <span className="text-sm text-gray-600">{exp.duration}</span>
              </div>
              <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
        <div className="space-y-3">
          {data.education.map((edu, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-green-600 font-medium">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-600">{edu.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-900 mb-2">{project.name}</h4>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Areas for Improvement</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{data.improvementAreas}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Upskilling Suggestions</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{data.upskillSuggestions}</p>
        </div>
      </div>

      {/* Additional Information */}
      {(data.certifications || data.languages) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.certifications && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
              <div className="space-y-2">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="space-y-2">
                {data.languages.map((lang, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-gray-700">{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ResumeAI</h1>
                <p className="text-xs text-gray-600">Intelligent Resume Parser</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200 inline-flex">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Resume
            </div>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              History
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'upload' && (
          <div className="space-y-8">
            {!extractedData && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Upload your resume
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your PDF resume here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    Choose File
                  </label>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 text-blue-600 mb-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                    <span className="font-medium">Processing your resume...</span>
                  </div>
                  <p className="text-gray-600">
                    Our AI is analyzing your resume and extracting key information.
                  </p>
                </div>
              </div>
            )}

            {extractedData && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Analysis</h2>
                  <p className="text-gray-600">
                    File: <span className="font-medium">{extractedData.filename}</span> • 
                    Processed on {new Date(extractedData.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <ResumeDataDisplay data={extractedData} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume History</h2>
              <p className="text-gray-600">View and manage your previously uploaded resumes</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Upload Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockHistoricalData.map((resume) => (
                      <tr key={resume.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{resume.name}</div>
                            <div className="text-sm text-gray-600">{resume.filename}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{resume.email}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4" />
                            {new Date(resume.uploadDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                                style={{ width: `${(resume.resumeRating / 10) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {resume.resumeRating}/10
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openModal(resume)}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Resume Details</h2>
                <p className="text-gray-600">{selectedResume.filename}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <ResumeDataDisplay data={selectedResume} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;