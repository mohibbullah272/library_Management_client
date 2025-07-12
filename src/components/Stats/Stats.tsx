import { Award, BookOpen, Clock, Users } from "lucide-react";


const Stats = () => {
      const stats = [
    { icon: BookOpen, label: 'Books Available', value: '10,000+' },
    { icon: Users, label: 'Active Members', value: '5,000+' },
    { icon: Clock, label: 'Open Hours', value: '24/7' },
    { icon: Award, label: 'Years Serving', value: '50+' }
  ];

    return (
        <div>
                      {/* Stats Grid */}
            <div className="grid md:grid-cols-2 grid-cols-1 md:px-10  px-5 gap-4 mt-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center border border-blue-100">
                    <IconComponent className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
        </div>
    );
};

export default Stats;