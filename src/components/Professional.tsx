import React from 'react';
import { Briefcase, GraduationCap, Users, Shield, Award, CheckCircle, Building, Phone } from 'lucide-react';

const Professional = () => {
  const services = [
    {
      icon: Briefcase,
      title: 'Corporate Wellness',
      description: 'Comprehensive mental health programs for organizations',
      features: [
        'Employee wellness assessments',
        'Stress management workshops',
        'Team building through mindfulness',
        'Executive coaching programs'
      ],
      pricing: 'Custom pricing based on company size'
    },
    {
      icon: Phone,
      title: 'Teletherapy Services',
      description: 'Professional therapy sessions with certified practitioners',
      features: [
        'Licensed therapist matching',
        'Secure video consultations',
        'Progress tracking and notes',
        'Insurance coverage support'
      ],
      pricing: 'Starting at $120/session'
    },
    {
      icon: GraduationCap,
      title: 'University Partnerships',
      description: 'Mental health resources for educational institutions',
      features: [
        'Student counseling services',
        'Faculty wellness programs',
        'Crisis intervention support',
        'Campus-wide wellness initiatives'
      ],
      pricing: 'Institutional pricing available'
    }
  ];

  const certifications = [
    {
      title: 'Nirvaha Wellness Practitioner',
      duration: '12 weeks',
      level: 'Beginner to Advanced',
      description: 'Comprehensive training in holistic wellness practices combining ancient wisdom with modern techniques.'
    },
    {
      title: 'AI-Assisted Therapy Certification',
      duration: '8 weeks',
      level: 'Professional',
      description: 'Learn to integrate AI tools in therapeutic practice while maintaining human connection and ethics.'
    },
    {
      title: 'Corporate Wellness Leadership',
      duration: '6 weeks',
      level: 'Executive',
      description: 'Design and implement organization-wide wellness programs that improve productivity and employee satisfaction.'
    }
  ];

  return (
    <section id="professional" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Professional
            <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"> Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive mental health solutions for organizations, institutions, and healthcare professionals.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Shield, label: 'HIPAA Compliant', desc: 'Secure & Private' },
            { icon: Award, label: 'Licensed Practitioners', desc: '500+ Certified' },
            { icon: Building, label: 'Enterprise Ready', desc: 'Scalable Solutions' },
            { icon: Users, label: 'Global Reach', desc: '50+ Countries' }
          ].map((trust, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <trust.icon className="h-6 w-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900 mb-1">{trust.label}</div>
              <div className="text-sm text-gray-600">{trust.desc}</div>
            </div>
          ))}
        </div>

        {/* Professional Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Professional Solutions</h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h4>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600 mb-4">{service.pricing}</div>
                  <button className="w-full bg-gradient-to-r from-teal-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification Programs */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nirvaha Academy</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advance your career with our comprehensive certification programs in holistic wellness and AI-assisted therapy.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {certifications.map((cert, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-teal-300 transition-colors">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="h-8 w-8 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{cert.title}</h4>
                </div>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{cert.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span className="font-medium">{cert.level}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-6">{cert.description}</p>
                
                <button className="w-full border-2 border-teal-600 text-teal-600 py-2 rounded-lg font-medium hover:bg-teal-600 hover:text-white transition-all duration-200">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-teal-50 to-purple-50 px-6 py-3 rounded-full mb-6">
              <Award className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-medium text-gray-700">Accredited by International Wellness Board</span>
            </div>
            <div>
              <button className="bg-gradient-to-r from-teal-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200">
                View All Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Professional;