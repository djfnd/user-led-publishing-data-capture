import React, { useState } from 'react';

// Simulated pre-filled data from distribution
const distributionData = {
  track_title: "Midnight in Barcelona",
  release_title: "Mediterranean Dreams EP",
  isrc: "ES-AB1-24-00001",
  release_date: "2026-03-15",
  alt_title: "Medianoche en Barcelona",
  performers: "Luna Martinez, Diego Fernández",
  language: "Spanish",
  track_length: "3:42",
  // Pre-filled from songwriter signup
  songwriter_name: "Luna Martinez",
  songwriter_ipi: "00523456789",
  songwriter_pro: "SGAE",
  songwriter_publisher: "Luna Martinez Publishing",
  songwriter_publisher_ipi: "00987654321"
};

export default function PublishingDataCapture() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Track confirmation
    altTitlesCorrect: null,
    additionalAltTitles: "",
    
    // Songwriter confirmation
    songwriterRole: null, // 'self' | 'other' | 'update'
    songwriterName: distributionData.songwriter_name,
    
    // IPI
    ipiStatus: null, // 'correct' | 'update' | 'none'
    ipi: distributionData.songwriter_ipi,
    hasProRegistration: null,
    selectedPro: "",
    proMemberNumber: "",
    
    // Split & Publisher
    ownershipSplit: "",
    publisherStatus: null, // 'correct' | 'self' | 'external'
    publisherName: distributionData.songwriter_publisher,
    publisherIpi: distributionData.songwriter_publisher_ipi,
    
    // Co-writers
    hasCoWriters: null,
    coWriterCount: 1,
    coWriters: [
      { name: "", ipi: "", split: "", publisher: "" },
      { name: "", ipi: "", split: "", publisher: "" },
      { name: "", ipi: "", split: "", publisher: "" },
      { name: "", ipi: "", split: "", publisher: "" }
    ],
    
    // Samples
    hasSamples: null,
    sampleDetails: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateCoWriter = (index, field, value) => {
    setFormData(prev => {
      const newCoWriters = [...prev.coWriters];
      newCoWriters[index] = { ...newCoWriters[index], [field]: value };
      return { ...prev, coWriters: newCoWriters };
    });
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const pros = [
    "ASCAP (USA)", "BMI (USA)", "SESAC (USA)", "GMR (USA)",
    "PRS for Music (UK)", "GEMA (Germany)", "SACEM (France)",
    "SGAE (Spain)", "SIAE (Italy)", "SACM (Mexico)",
    "ABRAMUS (Brazil)", "UBC (Brazil)", "SOCAN (Canada)",
    "APRA AMCOS (Australia/NZ)", "JASRAC (Japan)", "KOMCA (South Korea)", "Other"
  ];

  // Calculate total splits for validation
  const totalSplit = () => {
    let total = parseInt(formData.ownershipSplit) || 0;
    if (formData.hasCoWriters) {
      for (let i = 0; i < formData.coWriterCount; i++) {
        total += parseInt(formData.coWriters[i].split) || 0;
      }
    }
    return total;
  };

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Add Publishing Information</h1>
              <p className="text-gray-500 mt-2">Enable royalty collection for your composition</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Track</span>
                  <span className="font-medium text-gray-900">{distributionData.track_title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Release</span>
                  <span className="font-medium text-gray-900">{distributionData.release_title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ISRC</span>
                  <span className="font-mono text-sm text-gray-900">{distributionData.isrc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Performers</span>
                  <span className="text-gray-900">{distributionData.performers}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={nextStep}
              className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Start
            </button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Alternative Titles</h2>
              <p className="text-gray-500 mt-1">We have: <span className="text-gray-700">{distributionData.alt_title || "None"}</span></p>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-700">Are there any other titles for this composition?</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { updateField('altTitlesCorrect', false); nextStep(); }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.altTitlesCorrect === false 
                      ? 'border-violet-500 bg-violet-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">No, that's all</span>
                </button>
                <button
                  onClick={() => updateField('altTitlesCorrect', true)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.altTitlesCorrect === true 
                      ? 'border-violet-500 bg-violet-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">Yes, add more</span>
                </button>
              </div>
            </div>
            
            {formData.altTitlesCorrect === true && (
              <div className="space-y-2 animate-in slide-in-from-bottom-2">
                <label className="block text-sm font-medium text-gray-700">Additional titles</label>
                <textarea
                  value={formData.additionalAltTitles}
                  onChange={(e) => updateField('additionalAltTitles', e.target.value)}
                  placeholder="One title per line..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <button
                  onClick={nextStep}
                  className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors mt-4"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Primary Songwriter</h2>
              <p className="text-gray-500 mt-1">Who is the primary writer for this composition?</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-medium">
                  {distributionData.songwriter_name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{distributionData.songwriter_name}</div>
                  <div className="text-sm text-gray-500">{distributionData.songwriter_pro} {distributionData.songwriter_ipi ? `• ${distributionData.songwriter_ipi}` : ''}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div 
                onClick={() => { updateField('songwriterRole', 'self'); setStep(4); }}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
              >
                <div className="font-medium">I am the primary songwriter</div>
                <div className="text-sm text-gray-500">The details above are correct</div>
              </div>
              <div 
                onClick={() => { updateField('songwriterRole', 'update'); nextStep(); }}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
              >
                <div className="font-medium">I am the songwriter, but details need updating</div>
                <div className="text-sm text-gray-500">Correct my name or IPI</div>
              </div>
              <div 
                onClick={() => { 
                  updateField('songwriterRole', 'other'); 
                  updateField('songwriterName', '');
                  updateField('ipi', '');
                  nextStep(); 
                }}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
              >
                <div className="font-medium">I'm registering on behalf of someone else</div>
                <div className="text-sm text-gray-500">The primary songwriter is a different person</div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {formData.songwriterRole === 'other' ? 'Primary Songwriter Details' : 'Update Your Details'}
              </h2>
              <p className="text-gray-500 mt-1">
                {formData.songwriterRole === 'other' 
                  ? 'Enter the details of the primary songwriter' 
                  : 'Correct your information below'}
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full legal name</label>
                <input
                  type="text"
                  value={formData.songwriterName}
                  onChange={(e) => updateField('songwriterName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="As it appears on PRO registration"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IPI number</label>
                <input
                  type="text"
                  value={formData.ipi}
                  onChange={(e) => updateField('ipi', e.target.value.replace(/\D/g, '').slice(0, 11))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
                  placeholder="9-11 digits (optional)"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank if unknown</p>
              </div>
            </div>
            
            <button
              onClick={() => setStep(4)}
              disabled={!formData.songwriterName}
              className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        );

      case 4:
        // Ownership split - same for all paths
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Ownership Split</h2>
              <p className="text-gray-500 mt-1">What percentage of this composition does {formData.songwriterRole === 'other' ? formData.songwriterName : 'the primary writer'} own?</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={formData.ownershipSplit}
                  onChange={(e) => updateField('ownershipSplit', Math.min(100, Math.max(0, e.target.value)))}
                  className="w-24 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent text-center text-xl font-medium"
                  placeholder="50"
                  min="1"
                  max="100"
                />
                <span className="text-xl text-gray-500">%</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">If they're the sole writer, enter 100</p>
            </div>
            
            <button
              onClick={nextStep}
              disabled={!formData.ownershipSplit || formData.ownershipSplit < 1}
              className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Publishing Arrangement</h2>
              <p className="text-gray-500 mt-1">How is your publishing handled?</p>
            </div>
            
            {distributionData.songwriter_publisher ? (
              <>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Your Publisher</div>
                  <div className="font-medium text-gray-900">{distributionData.songwriter_publisher}</div>
                  {distributionData.songwriter_publisher_ipi && (
                    <div className="text-sm text-gray-500 font-mono">IPI: {distributionData.songwriter_publisher_ipi}</div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div 
                    onClick={() => { updateField('publisherStatus', 'correct'); nextStep(); }}
                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
                  >
                    <span className="font-medium">This is correct</span>
                  </div>
                  <div 
                    onClick={() => updateField('publisherStatus', 'self')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.publisherStatus === 'self' ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Different for this work - Self-published</div>
                    <div className="text-sm text-gray-500">I control publishing for this composition</div>
                  </div>
                  <div 
                    onClick={() => updateField('publisherStatus', 'external')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.publisherStatus === 'external' ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Different for this work - Other publisher</div>
                    <div className="text-sm text-gray-500">A different publisher represents this composition</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div 
                  onClick={() => updateField('publisherStatus', 'self')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.publisherStatus === 'self' ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">Self-published / No publisher</div>
                  <div className="text-sm text-gray-500">I control my own publishing</div>
                </div>
                <div 
                  onClick={() => updateField('publisherStatus', 'external')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.publisherStatus === 'external' ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">I have a publishing deal</div>
                  <div className="text-sm text-gray-500">An external publisher represents me</div>
                </div>
              </div>
            )}
            
            {formData.publisherStatus === 'self' && (
              <div className="space-y-4 animate-in slide-in-from-bottom-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publishing entity name (optional)</label>
                  <input
                    type="text"
                    value={formData.publisherName}
                    onChange={(e) => updateField('publisherName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Leave blank to use your writer name"
                  />
                </div>
                <button
                  onClick={() => { updateField('publisherIpi', ''); nextStep(); }}
                  className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}
            
            {formData.publisherStatus === 'external' && (
              <div className="space-y-4 animate-in slide-in-from-bottom-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publisher name</label>
                  <input
                    type="text"
                    value={formData.publisherName}
                    onChange={(e) => updateField('publisherName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publisher IPI (optional)</label>
                  <input
                    type="text"
                    value={formData.publisherIpi}
                    onChange={(e) => updateField('publisherIpi', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono"
                    placeholder="If known"
                  />
                </div>
                <button
                  onClick={nextStep}
                  disabled={!formData.publisherName}
                  className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Co-Writers</h2>
              <p className="text-gray-500 mt-1">Are there other writers on this composition?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { updateField('hasCoWriters', false); setStep(8); }}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                <span className="font-medium">No, I'm the sole writer</span>
              </button>
              <button
                onClick={() => { updateField('hasCoWriters', true); nextStep(); }}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                <span className="font-medium">Yes, there are co-writers</span>
              </button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Co-Writer Details</h2>
              <p className="text-gray-500 mt-1">Add information for each co-writer</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of co-writers</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateField('coWriterCount', Math.max(1, formData.coWriterCount - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-xl font-medium w-8 text-center">{formData.coWriterCount}</span>
                <button
                  onClick={() => updateField('coWriterCount', Math.min(4, formData.coWriterCount + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {[...Array(formData.coWriterCount)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-sm font-medium text-gray-500 mb-3">Co-Writer {i + 1}</div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.coWriters[i].name}
                      onChange={(e) => updateCoWriter(i, 'name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Full legal name"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={formData.coWriters[i].ipi}
                        onChange={(e) => updateCoWriter(i, 'ipi', e.target.value)}
                        className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent font-mono text-sm"
                        placeholder="IPI (optional)"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={formData.coWriters[i].split}
                          onChange={(e) => updateCoWriter(i, 'split', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          placeholder="Split"
                          min="1"
                          max="99"
                        />
                        <span className="text-gray-500">%</span>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={formData.coWriters[i].publisher}
                      onChange={(e) => updateCoWriter(i, 'publisher', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Publisher (optional)"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Split validation */}
            <div className={`p-3 rounded-xl ${totalSplit() === 100 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              <div className="flex items-center justify-between">
                <span className={totalSplit() === 100 ? 'text-green-700' : 'text-amber-700'}>Total splits</span>
                <span className={`font-mono font-medium ${totalSplit() === 100 ? 'text-green-700' : 'text-amber-700'}`}>
                  {totalSplit()}%
                </span>
              </div>
              {totalSplit() !== 100 && (
                <p className="text-xs text-amber-600 mt-1">Splits must total 100%</p>
              )}
            </div>
            
            <button
              onClick={nextStep}
              disabled={totalSplit() !== 100 || formData.coWriters.slice(0, formData.coWriterCount).some(cw => !cw.name || !cw.split)}
              className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Samples & Interpolations</h2>
              <p className="text-gray-500 mt-1">Does this composition contain any sampled or interpolated material?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { updateField('hasSamples', false); nextStep(); }}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                <span className="font-medium">No samples</span>
              </button>
              <button
                onClick={() => updateField('hasSamples', true)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.hasSamples === true ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">Yes, contains samples</span>
              </button>
            </div>
            
            {formData.hasSamples === true && (
              <div className="space-y-4 animate-in slide-in-from-bottom-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sample details</label>
                  <textarea
                    value={formData.sampleDetails}
                    onChange={(e) => updateField('sampleDetails', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Original song title, writers, and whether cleared (yes/no)"
                  />
                </div>
                <button
                  onClick={nextStep}
                  disabled={!formData.sampleDetails}
                  className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        );

      case 9:
        // Check for split validation error
        const splitError = !formData.hasCoWriters && parseInt(formData.ownershipSplit) !== 100;
        
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Review & Confirm</h2>
              <p className="text-gray-500 mt-1">Please verify your publishing information</p>
            </div>
            
            {/* Split validation error */}
            {splitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-red-800">Ownership split doesn't add up</p>
                    <p className="text-sm text-red-700 mt-1">
                      You indicated you're the sole writer but entered {formData.ownershipSplit}% ownership. 
                      Sole writers should have 100%, or you need to add co-writers.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => { updateField('ownershipSplit', '100'); }}
                        className="text-sm px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Set to 100%
                      </button>
                      <button
                        onClick={() => { updateField('hasCoWriters', true); setStep(7); }}
                        className="text-sm px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Add co-writers
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {/* Track */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Composition</div>
                <div className="font-medium text-gray-900">{distributionData.track_title}</div>
                <div className="text-sm text-gray-500">{distributionData.release_title}</div>
              </div>
              
              {/* Primary writer */}
              <div className={`bg-gray-50 rounded-xl p-4 border ${splitError ? 'border-red-300' : 'border-gray-200'}`}>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Primary Writer</div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{formData.songwriterName}</div>
                    <div className="text-sm text-gray-500">IPI: {formData.ipi || 'Pending'}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${splitError ? 'text-red-600' : 'text-gray-900'}`}>{formData.ownershipSplit}%</div>
                    <div className="text-sm text-gray-500">
                      {formData.publisherStatus === 'correct' 
                        ? distributionData.songwriter_publisher 
                        : formData.publisherStatus === 'self' 
                          ? (formData.publisherName || 'Self-published')
                          : formData.publisherName}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Co-writers */}
              {formData.hasCoWriters && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Co-Writers</div>
                  <div className="space-y-3">
                    {formData.coWriters.slice(0, formData.coWriterCount).map((cw, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{cw.name}</div>
                          <div className="text-sm text-gray-500">IPI: {cw.ipi || 'Unknown'}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{cw.split}%</div>
                          <div className="text-sm text-gray-500">{cw.publisher || 'No publisher'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Confirmation */}
            {!splitError && (
              <>
                <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-violet-600 rounded border-gray-300 focus:ring-violet-500"
                      id="confirm"
                    />
                    <span className="text-sm text-violet-900">
                      I confirm this information is accurate and authorize the registration of this composition with collection societies on behalf of the writers listed.
                    </span>
                  </label>
                </div>
                
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all"
                >
                  Submit Publishing Information
                </button>
                
                <button
                  onClick={() => {
                    setStep(0);
                    setFormData({
                      altTitlesCorrect: null,
                      additionalAltTitles: "",
                      songwriterRole: null,
                      songwriterName: distributionData.songwriter_name,
                      ipiStatus: null,
                      ipi: distributionData.songwriter_ipi,
                      hasProRegistration: null,
                      selectedPro: "",
                      proMemberNumber: "",
                      ownershipSplit: "",
                      publisherStatus: null,
                      publisherName: distributionData.songwriter_publisher,
                      publisherIpi: distributionData.songwriter_publisher_ipi,
                      hasCoWriters: null,
                      coWriterCount: 1,
                      coWriters: [
                        { name: "", ipi: "", split: "", publisher: "" },
                        { name: "", ipi: "", split: "", publisher: "" },
                        { name: "", ipi: "", split: "", publisher: "" },
                        { name: "", ipi: "", split: "", publisher: "" }
                      ],
                      hasSamples: null,
                      sampleDetails: ""
                    });
                  }}
                  className="w-full py-3 px-4 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Start over
                </button>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submitted!</h2>
          <p className="text-gray-500 mb-6">
            We've received the publishing data for <span className="font-medium text-gray-700">{distributionData.track_title}</span>
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm">
            <div className="font-medium text-gray-700 mb-2">What happens next:</div>
            <ol className="space-y-2 text-gray-600">
              <li className="flex gap-2">
                <span className="text-violet-500">1.</span>
                We'll validate the data and check for conflicts
              </li>
              <li className="flex gap-2">
                <span className="text-violet-500">2.</span>
                We'll register with the relevant collection societies
              </li>
              <li className="flex gap-2">
                <span className="text-violet-500">3.</span>
                You'll receive confirmation once complete
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        {/* Progress */}
        {step > 0 && step < 9 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <button onClick={prevStep} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-xs text-gray-400">Step {step} of 9</span>
              <div className="w-5" />
            </div>
            <div className="h-1 bg-gray-200 rounded-full">
              <div 
                className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-300"
                style={{ width: `${(step / 9) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {renderStep()}
      </div>
    </div>
  );
}