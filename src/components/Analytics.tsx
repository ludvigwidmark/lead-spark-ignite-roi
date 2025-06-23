
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Phone, Mail, Target, DollarSign } from "lucide-react";

const Analytics = () => {
  const leadSourceData = [
    { name: "Website", leads: 89, converted: 16 },
    { name: "LinkedIn", leads: 67, converted: 12 },
    { name: "Email Campaign", leads: 54, converted: 9 },
    { name: "Referrals", leads: 34, converted: 8 },
    { name: "Cold Outreach", leads: 23, converted: 3 },
  ];

  const conversionTrendData = [
    { month: "Jan", rate: 12, leads: 156 },
    { month: "Feb", rate: 15, leads: 189 },
    { month: "Mar", rate: 18, leads: 234 },
    { month: "Apr", rate: 22, leads: 267 },
    { month: "May", rate: 25, leads: 298 },
    { month: "Jun", rate: 28, leads: 312 },
  ];

  const outreachPerformance = [
    { name: "AI Voice Calls", value: 45, color: "#3b82f6" },
    { name: "Email Sequences", value: 35, color: "#10b981" },
    { name: "LinkedIn Messages", value: 20, color: "#f59e0b" },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-lg font-bold">28%</p>
                <p className="text-xs text-gray-600">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-lg font-bold">312</p>
                <p className="text-xs text-gray-600">Monthly Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-lg font-bold">89%</p>
                <p className="text-xs text-gray-600">Call Connect Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-lg font-bold">34%</p>
                <p className="text-xs text-gray-600">Email Open Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-lg font-bold">87</p>
                <p className="text-xs text-gray-600">Lead Score Avg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-yellow-600" />
              <div>
                <p className="text-lg font-bold">$2.4M</p>
                <p className="text-xs text-gray-600">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Lead Performance</TabsTrigger>
          <TabsTrigger value="outreach">Outreach Analytics</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Trend</CardTitle>
                <CardDescription>Monthly conversion rate and lead volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={conversionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="right" dataKey="leads" fill="#e5e7eb" name="Leads" />
                    <Line yAxisId="left" type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={3} name="Conversion %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outreach Channel Performance</CardTitle>
                <CardDescription>Success rate by outreach method</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={outreachPerformance}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {outreachPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Source Performance</CardTitle>
              <CardDescription>Lead generation and conversion by source</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={leadSourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#3b82f6" name="Total Leads" />
                  <Bar dataKey="converted" fill="#10b981" name="Converted" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outreach" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Voice Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Calls</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Connected</span>
                    <span className="font-medium">113 (89%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Interested</span>
                    <span className="font-medium">51 (45%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Duration</span>
                    <span className="font-medium">3.2 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Email Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Emails Sent</span>
                    <span className="font-medium">1,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Opened</span>
                    <span className="font-medium">495 (34%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Clicked</span>
                    <span className="font-medium">87 (6%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Replied</span>
                    <span className="font-medium">23 (1.6%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">LinkedIn Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Messages Sent</span>
                    <span className="font-medium">234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Accepted</span>
                    <span className="font-medium">89 (38%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Responded</span>
                    <span className="font-medium">34 (15%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Meetings Set</span>
                    <span className="font-medium">12 (5%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Optimization suggestions based on performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-medium text-green-800">Increase AI Call Volume</h4>
                    <p className="text-sm text-green-700">Voice calls show 45% conversion rate vs 15% for email. Recommend increasing call volume by 30%.</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-medium text-blue-800">Optimize Call Timing</h4>
                    <p className="text-sm text-blue-700">Best response rates occur Tuesday-Thursday, 10-11 AM and 2-3 PM. Adjust call scheduling accordingly.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-medium text-yellow-800">Refine Lead Scoring</h4>
                    <p className="text-sm text-yellow-700">Leads with 80+ scores convert at 35% vs 12% for lower scores. Consider raising qualification threshold.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key metrics and trends to watch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Lead Quality Score</span>
                      <span className="text-sm">87/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Campaign Efficiency</span>
                      <span className="text-sm">92/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">ROI Achievement</span>
                      <span className="text-sm">78/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
