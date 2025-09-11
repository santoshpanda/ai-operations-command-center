// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Users, DollarSign, TrendingUp, Zap, 
  AlertTriangle, Activity, ArrowUp, ArrowDown, Target, Bell 
} from 'lucide-react';

// Add this new component after your imports
const DemoControlPanel = ({ 
  metrics, 
  setMetrics, 
  customerData, 
  setCustomerData, 
  insights, 
  setInsights,
  onTriggerEvent 
}) => {
  const [showControls, setShowControls] = useState(false);

  // Predefined scenarios
  const scenarios = {
    normal: {
      name: "Normal Operations",
      metrics: { mrr: 129700, dailyUsers: 2223, pipelineValue: 618000, apiResponseTime: 83, churnRisk: 2 },
      insights: [
        { id: 1, type: 'opportunity', category: 'Revenue', title: 'Expansion Opportunity', message: 'CloudServ Inc ready for upsell', action: 'Schedule expansion call' }
      ]
    },
    crisis: {
      name: "Crisis Mode", 
      metrics: { mrr: 95000, dailyUsers: 1645, pipelineValue: 285000, apiResponseTime: 165, churnRisk: 7 },
      insights: [
        { id: 1, type: 'critical', category: 'Customer Success', title: 'Mass Churn Alert', message: '$127K MRR at risk', action: 'URGENT intervention required' },
        { id: 2, type: 'critical', category: 'Product', title: 'Performance Crisis', message: 'API degraded 180%', action: 'Emergency scaling needed' }
      ]
    },
    growth: {
      name: "Growth Surge",
      metrics: { mrr: 168500, dailyUsers: 2856, pipelineValue: 890000, apiResponseTime: 65, churnRisk: 1 },
      insights: [
        { id: 1, type: 'opportunity', category: 'Revenue', title: 'Multiple Expansions', message: '5 customers ready for upgrade', action: 'Accelerate upsell motions' }
      ]
    }
  };

  const applyScenario = (scenarioKey) => {
    const scenario = scenarios[scenarioKey];
    setMetrics(scenario.metrics);
    setInsights(scenario.insights);
    
    // Update customer health based on scenario
    const updatedCustomers = customerData.map(customer => {
      if (scenarioKey === 'crisis') {
        return { ...customer, health: Math.max(15, customer.health - 50), risk: customer.health < 40 ? 'Critical' : 'High' };
      } else if (scenarioKey === 'growth') {
        return { ...customer, health: Math.min(95, customer.health + 20), risk: 'Low' };
      }
      return customer;
    });
    setCustomerData(updatedCustomers);
  };

  const triggerCustomEvent = (eventType) => {
    const events = {
      churn_alert: { type: 'critical', title: 'Churn Risk Detected', message: 'Enterprise customer showing 40% usage decline' },
      expansion: { type: 'opportunity', title: 'Expansion Signal', message: 'Customer hit 95% of plan limits' },
      performance: { type: 'warning', title: 'Performance Spike', message: 'API response time increased 25%' },
      deal_won: { type: 'success', title: 'Deal Closed', message: 'Major enterprise deal signed - $85K ARR' }
    };
    
    if (onTriggerEvent && events[eventType]) {
      onTriggerEvent(events[eventType]);
    }
  };

  const updateCustomerHealth = (customerId, newHealth) => {
    const updated = customerData.map(customer => 
      customer.id === customerId 
        ? { 
            ...customer, 
            health: newHealth,
            risk: newHealth < 40 ? 'Critical' : newHealth < 70 ? 'High' : 'Low'
          }
        : customer
    );
    setCustomerData(updated);
  };

  if (!showControls) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowControls(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
        >
          🎮 Demo Controls
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">🎮 Live Demo Controls</h3>
        <button
          onClick={() => setShowControls(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Quick Scenarios */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Quick Scenarios</label>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => applyScenario(key)}
              className={`px-3 py-2 text-sm rounded border text-left ${
                key === 'crisis' ? 'border-red-300 text-red-700 hover:bg-red-50' :
                key === 'growth' ? 'border-green-300 text-green-700 hover:bg-green-50' :
                'border-blue-300 text-blue-700 hover:bg-blue-50'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Controls */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Adjust Metrics</label>
        <div className="space-y-2 text-xs">
          <div>
            <label>MRR: ${metrics.mrr?.toLocaleString()}</label>
            <input
              type="range"
              min="50000"
              max="200000"
              step="5000"
              value={metrics.mrr || 129700}
              onChange={(e) => setMetrics(prev => ({ ...prev, mrr: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label>API Response: {metrics.apiResponseTime}ms</label>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={metrics.apiResponseTime || 83}
              onChange={(e) => setMetrics(prev => ({ ...prev, apiResponseTime: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label>Daily Users: {metrics.dailyUsers?.toLocaleString()}</label>
            <input
              type="range"
              min="1000"
              max="5000"
              step="100"
              value={metrics.dailyUsers || 2223}
              onChange={(e) => setMetrics(prev => ({ ...prev, dailyUsers: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Customer Health Controls */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Customer Health</label>
        <div className="space-y-2">
          {customerData.slice(0, 3).map((customer) => (
            <div key={customer.id} className="flex items-center justify-between text-xs">
              <span className="truncate mr-2">{customer.name?.substring(0, 15)}...</span>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={customer.health}
                onChange={(e) => updateCustomerHealth(customer.id, parseInt(e.target.value))}
                className="w-20"
              />
              <span className="w-8 text-right">{customer.health}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Event Triggers */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Events</label>
        <div className="grid grid-cols-2 gap-1">
          {[
            { key: 'churn_alert', label: '⚠️ Churn', color: 'red' },
            { key: 'expansion', label: '📈 Expand', color: 'green' },
            { key: 'performance', label: '⚡ Perf', color: 'yellow' },
            { key: 'deal_won', label: '🎉 Win', color: 'blue' }
          ].map(event => (
            <button
              key={event.key}
              onClick={() => triggerCustomEvent(event.key)}
              className={`px-2 py-1 text-xs rounded border hover:bg-${event.color}-50 border-${event.color}-300 text-${event.color}-700`}
            >
              {event.label}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
        💡 <strong>Live Demo Tip:</strong> In production, this data flows from your CRM, support system, and product analytics automatically.
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [events, setEvents] = useState([]);
  
  // Sample data - simulates what would come from CSV files
  const [metrics, setMetrics] = useState({
    mrr: 129700,
    dailyUsers: 2223,
    pipelineValue: 618000,
    apiResponseTime: 83,
    churnRisk: 3
  });

  const [insights, setInsights] = useState([
    {
      id: 1,
      type: 'critical',
      category: 'Customer Success',
      title: 'Churn Risk Alert',
      message: '3 customers showing high churn probability. $47K MRR at risk.',
      action: 'Schedule intervention calls immediately'
    },
    {
      id: 2,
      type: 'opportunity',
      category: 'Revenue Growth',
      title: 'Expansion Opportunity',
      message: 'CloudServ Inc at 95% plan capacity. Ready for upsell conversation.',
      action: 'Trigger expansion workflow'
    },
    {
      id: 3,
      type: 'warning',
      category: 'Product Performance',
      title: 'API Response Time',
      message: 'Response time increased 15% over baseline. Monitor for customer impact.',
      action: 'Review infrastructure scaling'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate random events
      if (Math.random() > 0.7) {
        const eventTypes = [
          { type: 'critical', title: 'Customer Health Alert', message: 'DataFlow Industries usage declined 25%' },
          { type: 'opportunity', title: 'Expansion Ready', message: 'CloudServ Inc hitting plan limits' },
          { type: 'success', title: 'Deal Progression', message: 'ProTech moved to Negotiation stage' },
          { type: 'warning', title: 'Performance Alert', message: 'API response time spike detected' }
        ];
        
        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        setEvents(prev => [
          { ...event, id: Date.now(), timestamp: new Date() },
          ...prev.slice(0, 4)
        ]);
      }
      
      // Simulate metric fluctuations
      setMetrics(prev => ({
        ...prev,
        dailyUsers: Math.max(1800, prev.dailyUsers + Math.floor((Math.random() - 0.5) * 40)),
        apiResponseTime: Math.max(50, Math.min(200, prev.apiResponseTime + (Math.random() - 0.5) * 15)),
        mrr: Math.max(100000, prev.mrr + Math.floor((Math.random() - 0.5) * 2000)),
        pipelineValue: Math.max(500000, prev.pipelineValue + Math.floor((Math.random() - 0.5) * 10000))
      }));
      
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const MetricCard = ({ title, value, unit = '', icon: Icon, trend, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {unit === '$' ? `$${Math.round(value).toLocaleString()}` :
             unit === 'ms' ? `${Math.round(value)}ms` :
             Math.round(value).toLocaleString()}
          </p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trend > 0 ? (
            <ArrowUp className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm ml-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(trend).toFixed(1)}% from last period
          </span>
        </div>
      )}
    </div>
  );

  const InsightCard = ({ insight }) => {
    const typeColors = {
      critical: 'border-red-500 bg-red-50',
      warning: 'border-yellow-500 bg-yellow-50',
      opportunity: 'border-green-500 bg-green-50',
      success: 'border-blue-500 bg-blue-50'
    };

    return (
      <div className={`p-4 border-l-4 rounded-r-lg ${typeColors[insight.type]} mb-3`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h4 className="font-semibold text-sm">{insight.title}</h4>
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">{insight.category}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">{insight.message}</p>
            <p className="text-xs font-medium text-gray-900">→ {insight.action}</p>
          </div>
          <Target className="h-4 w-4 text-gray-600 ml-2" />
        </div>
      </div>
    );
  };

  const EventCard = ({ event }) => {
    const colors = {
      critical: 'border-red-500 bg-red-50',
      warning: 'border-yellow-500 bg-yellow-50',
      opportunity: 'border-green-500 bg-green-50', 
      success: 'border-blue-500 bg-blue-50'
    };

    return (
      <div className={`p-3 border-l-4 rounded-r ${colors[event.type]} mb-2`}>
        <div className="flex items-start">
          <Bell className="h-4 w-4 mt-0.5 mr-3 text-gray-600" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold">{event.title}</h4>
            <p className="text-sm text-gray-700 mt-1">{event.message}</p>
            <p className="text-xs text-gray-500 mt-2">{event.timestamp.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    );
  };

  // Replace the existing customerData array with this state
const [customerData, setCustomerData] = useState([
  {
    id: 'CUST-1001',
    name: 'TechCorp Solutions',
    plan: 'Enterprise',
    mrr: 8500,
    health: 85,
    risk: 'Low',
    trend: 'stable'
  },
  {
    id: 'CUST-1002',
    name: 'DataFlow Industries', 
    plan: 'Professional',
    mrr: 3200,
    health: 25,
    risk: 'High',
    trend: 'declining'
  },
  {
    id: 'CUST-1003',
    name: 'CloudServ Inc',
    plan: 'Enterprise',
    mrr: 12000,
    health: 95,
    risk: 'Low',
    trend: 'growing'
  },
  {
    id: 'CUST-1004',
    name: 'StartupX',
    plan: 'Starter',
    mrr: 899,
    health: 62,
    risk: 'Medium',
    trend: 'stable'
  }
]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Operations Command Center</h1>
            <p className="text-gray-600">Real-time intelligence for B2B SaaS operations • {currentTime.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                isRunning ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isRunning ? 'Stop' : 'Start'} Live Demo
            </button>
            {isRunning && (
              <div className="flex items-center text-green-600">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Live
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Monthly Recurring Revenue"
          value={metrics.mrr}
          unit="$"
          trend={8.5}
          icon={DollarSign}
          color="green"
        />
        <MetricCard 
          title="Daily Active Users"
          value={metrics.dailyUsers}
          trend={-2.3}
          icon={Users}
          color="blue"
        />
        <MetricCard 
          title="Pipeline Value"
          value={metrics.pipelineValue}
          unit="$"
          trend={15.2}
          icon={TrendingUp}
          color="purple"
        />
        <MetricCard 
          title="API Response Time"
          value={metrics.apiResponseTime}
          unit="ms"
          trend={-12.1}
          icon={Zap}
          color="orange"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Insights Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            AI-Powered Insights
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>

        {/* Customer Health Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Customer Health Overview
          </h2>
          <div className="space-y-4">
            {customerData.map((customer) => (
              <div 
                key={customer.id}
                className={`flex justify-between items-center p-3 rounded ${
                  customer.risk === 'High' ? 'bg-red-50 border-l-4 border-red-500' :
                  customer.risk === 'Medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                  'bg-gray-50'
                }`}
              >
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.plan} • ${customer.mrr.toLocaleString()}/mo</p>
                </div>
                <div className="text-right">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className={`h-2 rounded-full ${
                        customer.health >= 80 ? 'bg-green-600' :
                        customer.health >= 50 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{width: `${customer.health}%`}}
                    ></div>
                  </div>
                  <span className={`text-xs ${
                    customer.health >= 80 ? 'text-green-600' :
                    customer.health >= 50 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {customer.health}% Health
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Events Stream */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Live Event Stream
            {isRunning && <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>}
          </h2>
          
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {isRunning ? 'Monitoring for events...' : 'Start simulation to see real-time events'}
            </p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sales Pipeline Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sales Pipeline */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Sales Pipeline
          </h2>
          <div className="space-y-3">
            {[
              { company: 'ProTech Industries', value: 45000, stage: 'Proposal', probability: 75 },
              { company: 'DataMax Corp', value: 28000, stage: 'Discovery', probability: 40 },
              { company: 'CloudFirst Ltd', value: 67000, stage: 'Negotiation', probability: 85 },
              { company: 'InnovateNow', value: 89000, stage: 'Negotiation', probability: 90 }
            ].map((deal, index) => (
              <div key={index} className="border-b pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{deal.company}</p>
                    <p className="text-sm text-gray-600">{deal.stage}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${deal.value.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{deal.probability}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-green-600 h-1 rounded-full" 
                        style={{width: `${deal.probability}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Health */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Financial Health
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ARR</span>
              <span className="font-semibold">$1,556,400</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Net Revenue Retention</span>
              <span className="font-semibold text-green-600">112.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Churn Rate</span>
              <span className="font-semibold">2.6%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">LTV:CAC Ratio</span>
              <span className="font-semibold">4.1:1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Gross Margin</span>
              <span className="font-semibold text-green-600">81.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Runway</span>
              <span className="font-semibold text-red-600">7.9 months</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <span>Status: {isRunning ? 'Live Simulation Running' : 'Demo Ready'}</span>
            <span>Events Generated: {events.length}</span>
            <span>High-Risk Customers: {customerData.filter(c => c.risk === 'High').length}</span>
            <span>System Health: Operational</span>
          </div>
          <div>
            Last Update: {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Demo Control Panel */}
      <DemoControlPanel
        metrics={metrics}
        setMetrics={setMetrics}
        customerData={customerData}
        setCustomerData={setCustomerData}
        insights={insights}
        setInsights={setInsights}
        onTriggerEvent={(event) => {
          setEvents(prev => [
            { ...event, id: Date.now(), timestamp: new Date() },
            ...prev.slice(0, 4)
          ]);
        }}
      />
    </div>
  );
};

export default Dashboard;