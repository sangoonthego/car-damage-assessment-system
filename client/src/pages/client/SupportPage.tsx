import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  Clock
} from 'lucide-react';

export function SupportPage() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'bot',
      content: 'こんにちは！CarAssess AIサポートです。どのようなご用件でしょうか？',
      timestamp: '14:30'
    }
  ]);

  const quickQuestions = [
    '評価の進捗状況を確認したい',
    '修理費用の見積もりについて',
    'PDFレポートのダウンロード方法',
    '保険請求のサポート'
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        role: 'bot',
        content: 'ご質問ありがとうございます。担当者が確認して、すぐに回答いたします。',
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-block mb-3">
          <Badge className="bg-red-50 text-red-700 border border-red-100">
            クライアント機能
          </Badge>
        </div>
        <h1 className="text-slate-900 mb-2">サポート</h1>
        <p className="text-slate-600">
          AIチャットボットまたはサポートチームにお問い合わせください
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chat Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Chatbot */}
          <Card className="border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-white mb-1">AI サポートアシスタント</h2>
                  <p className="text-blue-100">24時間対応</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-4 h-96 overflow-y-auto bg-slate-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'bot' ? 'bg-blue-100' : 'bg-red-100'
                  }`}>
                    {msg.role === 'bot' ? (
                      <Bot className="w-5 h-5 text-blue-600" />
                    ) : (
                      <User className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-xl ${
                      msg.role === 'bot' 
                        ? 'bg-white border border-slate-200' 
                        : 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                    }`}>
                      <p>{msg.content}</p>
                    </div>
                    <p className="text-slate-500 text-sm mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="p-6 border-t border-slate-200">
              <p className="text-slate-600 mb-3">よくある質問:</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(q)}
                    className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-left text-sm text-slate-700 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-slate-200 bg-white">
              <div className="flex gap-3">
                <Input
                  placeholder="メッセージを入力..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-8 border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-slate-900">お問い合わせフォーム</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">件名</Label>
                <Input id="subject" placeholder="お問い合わせの内容" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">詳細</Label>
                <Textarea
                  id="description"
                  placeholder="詳しい内容を入力してください..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">優先度</Label>
                <select 
                  id="priority" 
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  <option>通常</option>
                  <option>高</option>
                  <option>緊急</option>
                </select>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                送信する
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <Card className="p-6 border-slate-200">
            <h3 className="text-slate-900 mb-4">お問い合わせ方法</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <h4 className="text-blue-900">チャット</h4>
                </div>
                <p className="text-blue-700 mb-2">即座に対応</p>
                <p className="text-blue-600 text-sm">24時間365日利用可能</p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  <h4 className="text-green-900">メール</h4>
                </div>
                <p className="text-green-700 mb-2">support@carassess.ai</p>
                <p className="text-green-600 text-sm">24時間以内に返信</p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <h4 className="text-orange-900">電話</h4>
                </div>
                <p className="text-orange-700 mb-2">03-1234-5678</p>
                <p className="text-orange-600 text-sm">平日 9:00-18:00</p>
              </div>
            </div>
          </Card>

          {/* FAQ */}
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">よくある質問</h3>
            </div>
            
            <div className="space-y-3">
              <a href="/help" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <p className="text-slate-900 mb-1">評価の流れについて</p>
                <p className="text-slate-500 text-sm">詳細を見る →</p>
              </a>
              <a href="/help" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <p className="text-slate-900 mb-1">料金プランについて</p>
                <p className="text-slate-500 text-sm">詳細を見る →</p>
              </a>
              <a href="/help" className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <p className="text-slate-900 mb-1">保険請求のサポート</p>
                <p className="text-slate-500 text-sm">詳細を見る →</p>
              </a>
            </div>
          </Card>

          {/* Response Time */}
          <Card className="p-6 border-slate-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-purple-600" />
              <h4 className="text-purple-900">平均応答時間</h4>
            </div>
            <p className="text-purple-900 mb-1">チャット: 2分以内</p>
            <p className="text-purple-900 mb-1">メール: 4時間以内</p>
            <p className="text-purple-900">電話: 即座に対応</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
