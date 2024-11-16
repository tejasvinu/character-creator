/* eslint-disable react/prop-types */
import { useRef, useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import ProfilePage from './profile-page';

const STORAGE_KEY = 'cyberpunk-character-profile';

const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {};
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {};
  }
};

const Section = ({ title, children }) => (
  <div className="mb-6 md:mb-8 print:mb-4 print:break-inside-avoid">
    <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-purple-600 border-b-2 border-purple-600 pb-2 print:text-black print:border-black">{title}</h2>
    {children}
  </div>
);

const SubSection = ({ title, children }) => (
  <div className="mb-4 md:mb-6 print:mb-3 print:break-inside-avoid">
    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-cyan-600 print:text-black">{title}</h3>
    {children}
  </div>
);

const Field = ({ label, placeholder = "", onChange, value }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
  </div>
);

const TextArea = ({ label, placeholder = "", onChange, value }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
  </div>
);

const PrintButton = ({ onPrint }) => (
  <button
    onClick={onPrint}
    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 print:hidden mb-2 w-full md:w-auto"
  >
    Print Profile
  </button>
);

// Add new ExportMarkdownButton component
const ExportMarkdownButton = ({ onExport }) => (
  <button
    onClick={onExport}
    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 print:hidden mb-4 w-full md:w-auto md:ml-2"
  >
    Export to MD
  </button>
);

// Update ExportButton text to be more specific
const ExportButton = ({ onExport }) => (
  <button
    onClick={onExport}
    className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 print:hidden mb-4 w-full md:w-auto md:ml-2"
  >
    Export to TXT
  </button>
);

// New ExportFillableTxtButton component
const ExportFillableTxtButton = ({ onExport }) => (
  <button
    onClick={onExport}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 print:hidden mb-4 w-full md:w-auto md:ml-2"
  >
    Export Fillable TXT
  </button>
);

// New UploadFilledFormButton component
const UploadFilledFormButton = ({ onUpload }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 text-gray-700">Upload Filled Form</label>
    <input
      type="file"
      accept=".txt"
      onChange={onUpload}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const ClearFormButton = ({ onClear }) => (
  <button
    onClick={onClear}
    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 print:hidden mb-4 w-full md:w-auto md:ml-2"
  >
    Clear Form
  </button>
);

const ProfileContent = forwardRef(({ formData, handleInputChange, handlePrint, handleExport, handleExportMarkdown, handleClearForm, handleExportFillableTxt, handleUploadFilledForm }, ref) => (
  <div 
    ref={ref} 
    className="max-w-4xl mx-auto p-4 md:p-8 bg-white print:p-4 print:max-w-none print:mx-0 print:bg-white"
  >
    <div className="flex flex-col md:flex-row md:justify-end md:space-x-2 mb-4 print:hidden">
      <PrintButton onPrint={handlePrint} />
      <ExportButton onExport={handleExport} />
      <ExportMarkdownButton onExport={handleExportMarkdown} />
      <ExportFillableTxtButton onExport={handleExportFillableTxt} />
      <UploadFilledFormButton onUpload={handleUploadFilledForm} />
      <ClearFormButton onClear={handleClearForm} />
    </div>

    <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-purple-800 print:text-black print:mb-4">
      CYBER DYSTOPIAN CHARACTER PROFILE
    </h1>
  
    <Section title="CONCEPT & IDENTITY">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field 
          label="Character Name" 
          value={formData.characterName}
          onChange={handleInputChange('characterName')}
        />
        <Field 
          label="Aliases/Handle"
          value={formData.aliases}
          onChange={handleInputChange('aliases')}
        />
        <Field 
          label="Concept/Archetype"
          value={formData.concept}
          onChange={handleInputChange('concept')}
        />
        <Field 
          label="Age"
          value={formData.age}
          onChange={handleInputChange('age')}
        />
        <Field 
          label="Gender"
          value={formData.gender}
          onChange={handleInputChange('gender')}
        />
        <Field 
          label="Ethnicity/Nationality"
          value={formData.ethnicity}
          onChange={handleInputChange('ethnicity')}
        />
        <Field 
          label="Languages Spoken"
          value={formData.languages}
          onChange={handleInputChange('languages')}
        />
        <Field 
          label="Birthplace"
          value={formData.birthplace}
          onChange={handleInputChange('birthplace')}
        />
        <Field 
          label="Current Location"
          value={formData.location}
          onChange={handleInputChange('location')}
        />
        <Field 
          label="Social Class/Status"
          value={formData.socialClass}
          onChange={handleInputChange('socialClass')}
        />
        <Field 
          label="Digital Identity Score"
          value={formData.digitalIdentity}
          onChange={handleInputChange('digitalIdentity')}
        />
        <Field 
          label="Legal Status"
          value={formData.legalStatus}
          onChange={handleInputChange('legalStatus')}
        />
      </div>
    </Section>

    <Section title="PHYSICAL ATTRIBUTES">
      <SubSection title="Natural Characteristics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Height"
            value={formData.height}
            onChange={handleInputChange('height')}
          />
          <Field 
            label="Weight"
            value={formData.weight}
            onChange={handleInputChange('weight')}
          />
          <Field 
            label="Build"
            value={formData.build}
            onChange={handleInputChange('build')}
          />
          <Field 
            label="Eye Color"
            value={formData.eyeColor}
            onChange={handleInputChange('eyeColor')}
          />
          <Field 
            label="Hair"
            value={formData.hair}
            onChange={handleInputChange('hair')}
          />
          <Field 
            label="Skin Tone/Complexion"
            value={formData.skinTone}
            onChange={handleInputChange('skinTone')}
          />
          <Field 
            label="Species (if applicable)"
            value={formData.species}
            onChange={handleInputChange('species')}
          />
          <Field 
            label="Voice Description"
            value={formData.voice}
            onChange={handleInputChange('voice')}
          />
          <Field 
            label="Identifying Marks"
            value={formData.identifyingMarks}
            onChange={handleInputChange('identifyingMarks')}
          />
        </div>
      </SubSection>

      <SubSection title="Technological Augmentations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Types and Functions"
            value={formData.typesAndFunctions}
            onChange={handleInputChange('typesAndFunctions')}
          />
          <Field 
            label="Visible Modifications"
            value={formData.visibleModifications}
            onChange={handleInputChange('visibleModifications')}
          />
          <Field 
            label="Internal Augmentations"
            value={formData.internalAugmentations}
            onChange={handleInputChange('internalAugmentations')}
          />
          <Field 
            label="Neural Implants"
            value={formData.neuralImplants}
            onChange={handleInputChange('neuralImplants')}
          />
          <Field 
            label="Interface Capabilities"
            value={formData.interfaceCapabilities}
            onChange={handleInputChange('interfaceCapabilities')}
          />
          <Field 
            label="Origin (Corporate/Black Market)"
            value={formData.origin}
            onChange={handleInputChange('origin')}
          />
          <Field 
            label="Maintenance Requirements"
            value={formData.maintenanceRequirements}
            onChange={handleInputChange('maintenanceRequirements')}
          />
          <Field 
            label="Known Glitches"
            value={formData.knownGlitches}
            onChange={handleInputChange('knownGlitches')}
          />
          <Field 
            label="Side Effects"
            value={formData.sideEffects}
            onChange={handleInputChange('sideEffects')}
          />
          <Field 
            label="Legality Status"
            value={formData.legalityStatus}
            onChange={handleInputChange('legalityStatus')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="VISUAL REPRESENTATION">
      <SubSection title="Appearance & Style">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Style/Fashion Choices"
            value={formData.style}
            onChange={handleInputChange('style')}
          />
          <Field 
            label="Typical Attire"
            value={formData.attire}
            onChange={handleInputChange('attire')}
          />
          <Field 
            label="Protective Gear/Armor"
            value={formData.protectiveGear}
            onChange={handleInputChange('protectiveGear')}
          />
          <Field 
            label="Notable Accessories"
            value={formData.accessories}
            onChange={handleInputChange('accessories')}
          />
          <Field 
            label="Weapons/Tools"
            value={formData.weapons}
            onChange={handleInputChange('weapons')}
          />
          <Field 
            label="Urban Decay Influence"
            value={formData.urbanDecay}
            onChange={handleInputChange('urbanDecay')}
          />
          <Field 
            label="Techno-Futuristic Elements"
            value={formData.technoFuturistic}
            onChange={handleInputChange('technoFuturistic')}
          />
        </div>
      </SubSection>

      <SubSection title="Digital Presence">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Digital Avatar Appearance"
            value={formData.digitalAvatar}
            onChange={handleInputChange('digitalAvatar')}
          />
          <Field 
            label="Social Media Persona"
            value={formData.socialMedia}
            onChange={handleInputChange('socialMedia')}
          />
          <Field 
            label="Virtual Reality Presence"
            value={formData.virtualReality}
            onChange={handleInputChange('virtualReality')}
          />
          <Field 
            label="Digital Footprint"
            value={formData.digitalFootprint}
            onChange={handleInputChange('digitalFootprint')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="PSYCHOLOGICAL PROFILE">
      <SubSection title="Core Personality">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextArea 
            label="General Demeanor"
            value={formData.generalDemeanor}
            onChange={handleInputChange('generalDemeanor')}
          />
          <TextArea 
            label="Dominant Traits"
            value={formData.dominantTraits}
            onChange={handleInputChange('dominantTraits')}
          />
          <TextArea 
            label="Positive Attributes"
            value={formData.positiveAttributes}
            onChange={handleInputChange('positiveAttributes')}
          />
          <TextArea 
            label="Negative Attributes"
            value={formData.negativeAttributes}
            onChange={handleInputChange('negativeAttributes')}
          />
          <TextArea 
            label="Fears/Phobias"
            value={formData.fears}
            onChange={handleInputChange('fears')}
          />
          <TextArea 
            label="Desires"
            value={formData.desires}
            onChange={handleInputChange('desires')}
          />
          <Field 
            label="Quirks/Habits"
            value={formData.quirks}
            onChange={handleInputChange('quirks')}
          />
          <Field 
            label="Moral Code"
            value={formData.moralCode}
            onChange={handleInputChange('moralCode')}
          />
          <Field 
            label="Intelligence Quotient"
            value={formData.intelligence}
            onChange={handleInputChange('intelligence')}
          />
          <Field 
            label="Emotional Intelligence"
            value={formData.emotionalIntelligence}
            onChange={handleInputChange('emotionalIntelligence')}
          />
          <Field 
            label="Personality Type"
            value={formData.personalityType}
            onChange={handleInputChange('personalityType')}
          />
          <TextArea 
            label="Public vs Private Persona"
            value={formData.publicPersona}
            onChange={handleInputChange('publicPersona')}
          />
        </div>
      </SubSection>

      <SubSection title="Mental Health">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Known Conditions"
            value={formData.knownConditions}
            onChange={handleInputChange('knownConditions')}
          />
          <Field 
            label="Digital Addiction Level"
            value={formData.digitalAddiction}
            onChange={handleInputChange('digitalAddiction')}
          />
          <Field 
            label="Reality Perception Issues"
            value={formData.realityPerception}
            onChange={handleInputChange('realityPerception')}
          />
          <TextArea 
            label="Coping Mechanisms"
            value={formData.copingMechanisms}
            onChange={handleInputChange('copingMechanisms')}
          />
          <TextArea 
            label="Trauma Response Patterns"
            value={formData.traumaResponse}
            onChange={handleInputChange('traumaResponse')}
          />
          <Field 
            label="Level of Self-Awareness"
            value={formData.selfAwareness}
            onChange={handleInputChange('selfAwareness')}
          />
          <TextArea 
            label="Mental Strengths"
            value={formData.mentalStrengths}
            onChange={handleInputChange('mentalStrengths')}
          />
          <TextArea 
            label="Mental Weaknesses"
            value={formData.mentalWeaknesses}
            onChange={handleInputChange('mentalWeaknesses')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="SKILLS & ABILITIES">
      <SubSection title="Technical Capabilities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Hacking/Cybersecurity"
            value={formData.hacking}
            onChange={handleInputChange('hacking')}
          />
          <Field 
            label="Programming/Engineering"
            value={formData.programming}
            onChange={handleInputChange('programming')}
          />
          <Field 
            label="Hardware Expertise"
            value={formData.hardware}
            onChange={handleInputChange('hardware')}
          />
          <Field 
            label="Software Knowledge"
            value={formData.software}
            onChange={handleInputChange('software')}
          />
          <Field 
            label="Network Navigation"
            value={formData.networkNavigation}
            onChange={handleInputChange('networkNavigation')}
          />
          <Field 
            label="Encryption/Decryption"
            value={formData.encryption}
            onChange={handleInputChange('encryption')}
          />
          <Field 
            label="Virtual Reality Proficiency"
            value={formData.virtualRealityProficiency}
            onChange={handleInputChange('virtualRealityProficiency')}
          />
        </div>
      </SubSection>

      <SubSection title="Physical Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Combat Training"
            value={formData.combatTraining}
            onChange={handleInputChange('combatTraining')}
          />
          <Field 
            label="Weapon Proficiency"
            value={formData.weaponProficiency}
            onChange={handleInputChange('weaponProficiency')}
          />
          <Field 
            label="Stealth/Agility"
            value={formData.stealth}
            onChange={handleInputChange('stealth')}
          />
          <Field 
            label="Physical Enhancements"
            value={formData.physicalEnhancements}
            onChange={handleInputChange('physicalEnhancements')}
          />
          <Field 
            label="Survival Skills"
            value={formData.survivalSkills}
            onChange={handleInputChange('survivalSkills')}
          />
          <Field 
            label="Movement Capabilities"
            value={formData.movementCapabilities}
            onChange={handleInputChange('movementCapabilities')}
          />
        </div>
      </SubSection>

      <SubSection title="Social Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Manipulation Abilities"
            value={formData.manipulationAbilities}
            onChange={handleInputChange('manipulationAbilities')}
          />
          <Field 
            label="Digital Social Engineering"
            value={formData.digitalSocialEngineering}
            onChange={handleInputChange('digitalSocialEngineering')}
          />
          <Field 
            label="Leadership Capabilities"
            value={formData.leadershipCapabilities}
            onChange={handleInputChange('leadershipCapabilities')}
          />
          <Field 
            label="Underground Connections"
            value={formData.undergroundConnections}
            onChange={handleInputChange('undergroundConnections')}
          />
          <Field 
            label="Negotiation Skills"
            value={formData.negotiationSkills}
            onChange={handleInputChange('negotiationSkills')}
          />
          <Field 
            label="Information Gathering"
            value={formData.informationGathering}
            onChange={handleInputChange('informationGathering')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="BACKGROUND & HISTORY">
      <SubSection title="Personal History">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Family Background"
            value={formData.familyBackground}
            onChange={handleInputChange('familyBackground')}
          />
          <Field 
            label="Early Life Events"
            value={formData.earlyLifeEvents}
            onChange={handleInputChange('earlyLifeEvents')}
          />
          <Field 
            label="Education/Training"
            value={formData.education}
            onChange={handleInputChange('education')}
          />
          <Field 
            label="Significant Life Changes"
            value={formData.lifeChanges}
            onChange={handleInputChange('lifeChanges')}
          />
          <Field 
            label="Major Tech Milestones"
            value={formData.techMilestones}
            onChange={handleInputChange('techMilestones')}
          />
          <Field 
            label="Formative Experiences"
            value={formData.formativeExperiences}
            onChange={handleInputChange('formativeExperiences')}
          />
          <Field 
            label="Criminal Record"
            value={formData.criminalRecord}
            onChange={handleInputChange('criminalRecord')}
          />
        </div>
      </SubSection>

      <SubSection title="Career/Professional Path">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Current Occupation"
            value={formData.currentOccupation}
            onChange={handleInputChange('currentOccupation')}
          />
          <Field 
            label="Past Positions"
            value={formData.pastPositions}
            onChange={handleInputChange('pastPositions')}
          />
          <Field 
            label="Notable Achievements"
            value={formData.achievements}
            onChange={handleInputChange('achievements')}
          />
          <Field 
            label="Professional Reputation"
            value={formData.reputation}
            onChange={handleInputChange('reputation')}
          />
          <Field 
            label="Digital Footprint"
            value={formData.professionalDigitalFootprint}
            onChange={handleInputChange('professionalDigitalFootprint')}
          />
          <Field 
            label="Workplace Environment"
            value={formData.workplaceEnvironment}
            onChange={handleInputChange('workplaceEnvironment')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="RELATIONSHIPS & CONNECTIONS">
      <SubSection title="Personal Relationships">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Family Ties"
            value={formData.familyTies}
            onChange={handleInputChange('familyTies')}
          />
          <Field 
            label="Close Associates"
            value={formData.closeAssociates}
            onChange={handleInputChange('closeAssociates')}
          />
          <Field 
            label="Digital-Only Relations"
            value={formData.digitalRelations}
            onChange={handleInputChange('digitalRelations')}
          />
          <Field 
            label="AI Interactions"
            value={formData.aiInteractions}
            onChange={handleInputChange('aiInteractions')}
          />
          <Field 
            label="Trust Network"
            value={formData.trustNetwork}
            onChange={handleInputChange('trustNetwork')}
          />
          <Field 
            label="Romantic Interests"
            value={formData.romanticInterests}
            onChange={handleInputChange('romanticInterests')}
          />
          <Field 
            label="Mentors/Proteges"
            value={formData.mentors}
            onChange={handleInputChange('mentors')}
          />
          <Field 
            label="Enemies/Rivals"
            value={formData.enemies}
            onChange={handleInputChange('enemies')}
          />
        </div>
      </SubSection>

      <SubSection title="Professional Networks">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Corporate Contacts"
            value={formData.corporateContacts}
            onChange={handleInputChange('corporateContacts')}
          />
          <Field 
            label="Underground Connections"
            value={formData.professionalUndergroundConnections}
            onChange={handleInputChange('professionalUndergroundConnections')}
          />
          <Field 
            label="Hacker Collectives"
            value={formData.hackerCollectives}
            onChange={handleInputChange('hackerCollectives')}
          />
          <Field 
            label="Information Brokers"
            value={formData.informationBrokers}
            onChange={handleInputChange('informationBrokers')}
          />
          <Field 
            label="AI Partnerships"
            value={formData.aiPartnerships}
            onChange={handleInputChange('aiPartnerships')}
          />
          <Field 
            label="Black Market Ties"
            value={formData.blackMarketTies}
            onChange={handleInputChange('blackMarketTies')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="TECHNOLOGICAL PROFILE">
      <SubSection title="Digital Infrastructure">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Primary Device(s)"
            value={formData.primaryDevices}
            onChange={handleInputChange('primaryDevices')}
          />
          <Field 
            label="Backup Systems"
            value={formData.backupSystems}
            onChange={handleInputChange('backupSystems')}
          />
          <Field 
            label="Security Protocols"
            value={formData.securityProtocols}
            onChange={handleInputChange('securityProtocols')}
          />
          <Field 
            label="Network Access Level"
            value={formData.networkAccess}
            onChange={handleInputChange('networkAccess')}
          />
          <Field 
            label="Digital Currency"
            value={formData.digitalCurrency}
            onChange={handleInputChange('digitalCurrency')}
          />
          <Field 
            label="Virtual Assets"
            value={formData.virtualAssets}
            onChange={handleInputChange('virtualAssets')}
          />
        </div>
      </SubSection>

      <SubSection title="Environmental Tech">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Home Security Systems"
            value={formData.homeSecurity}
            onChange={handleInputChange('homeSecurity')}
          />
          <Field 
            label="Transportation Methods"
            value={formData.transportation}
            onChange={handleInputChange('transportation')}
          />
          <Field 
            label="Communication Devices"
            value={formData.communicationDevices}
            onChange={handleInputChange('communicationDevices')}
          />
          <Field 
            label="Environmental Adaptations"
            value={formData.environmentalAdaptations}
            onChange={handleInputChange('environmentalAdaptations')}
          />
          <Field 
            label="Climate Protection"
            value={formData.climateProtection}
            onChange={handleInputChange('climateProtection')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="IDEOLOGICAL FRAMEWORK">
      <SubSection title="Beliefs & Values">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Views on Technology"
            value={formData.viewsOnTechnology}
            onChange={handleInputChange('viewsOnTechnology')}
          />
          <Field 
            label="Political Stance"
            value={formData.politicalStance}
            onChange={handleInputChange('politicalStance')}
          />
          <Field 
            label="Corporate Attitudes"
            value={formData.corporateAttitudes}
            onChange={handleInputChange('corporateAttitudes')}
          />
          <Field 
            label="Human Evolution Theory"
            value={formData.humanEvolution}
            onChange={handleInputChange('humanEvolution')}
          />
          <Field 
            label="Digital Rights Position"
            value={formData.digitalRights}
            onChange={handleInputChange('digitalRights')}
          />
          <Field 
            label="Privacy Philosophy"
            value={formData.privacyPhilosophy}
            onChange={handleInputChange('privacyPhilosophy')}
          />
          <Field 
            label="Authority Perspective"
            value={formData.authorityPerspective}
            onChange={handleInputChange('authorityPerspective')}
          />
        </div>
      </SubSection>

      <SubSection title="Ethical Framework">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Red Lines"
            value={formData.redLines}
            onChange={handleInputChange('redLines')}
          />
          <Field 
            label="Justified Actions"
            value={formData.justifiedActions}
            onChange={handleInputChange('justifiedActions')}
          />
          <Field 
            label="Technology Ethics"
            value={formData.technologyEthics}
            onChange={handleInputChange('technologyEthics')}
          />
          <Field 
            label="Data Privacy Views"
            value={formData.dataPrivacy}
            onChange={handleInputChange('dataPrivacy')}
          />
          <Field 
            label="AI Rights Position"
            value={formData.aiRights}
            onChange={handleInputChange('aiRights')}
          />
          <Field 
            label="Compromise Threshold"
            value={formData.compromiseThreshold}
            onChange={handleInputChange('compromiseThreshold')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="MOTIVATIONS & GOALS">
      <SubSection title="Primary Drivers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Short-term Objectives"
            value={formData.shortTermObjectives}
            onChange={handleInputChange('shortTermObjectives')}
          />
          <Field 
            label="Long-term Ambitions"
            value={formData.longTermAmbitions}
            onChange={handleInputChange('longTermAmbitions')}
          />
          <Field 
            label="Personal Mission"
            value={formData.personalMission}
            onChange={handleInputChange('personalMission')}
          />
          <Field 
            label="Hidden Agendas"
            value={formData.hiddenAgendas}
            onChange={handleInputChange('hiddenAgendas')}
          />
          <Field 
            label="Revenge Targets"
            value={formData.revengeTargets}
            onChange={handleInputChange('revengeTargets')}
          />
          <Field 
            label="Survival Strategies"
            value={formData.survivalStrategies}
            onChange={handleInputChange('survivalStrategies')}
          />
        </div>
      </SubSection>

      <SubSection title="Conflict Points">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Personal Demons"
            value={formData.personalDemons}
            onChange={handleInputChange('personalDemons')}
          />
          <Field 
            label="External Threats"
            value={formData.externalThreats}
            onChange={handleInputChange('externalThreats')}
          />
          <Field 
            label="Systemic Challenges"
            value={formData.systemicChallenges}
            onChange={handleInputChange('systemicChallenges')}
          />
          <Field 
            label="Technological Limitations"
            value={formData.technologicalLimitations}
            onChange={handleInputChange('technologicalLimitations')}
          />
          <Field 
            label="Social Barriers"
            value={formData.socialBarriers}
            onChange={handleInputChange('socialBarriers')}
          />
          <Field 
            label="Environmental Pressures"
            value={formData.environmentalPressures}
            onChange={handleInputChange('environmentalPressures')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="FACTION & ORGANIZATION TIES">
      <SubSection title="Affiliations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Primary Organization"
            value={formData.primaryOrganization}
            onChange={handleInputChange('primaryOrganization')}
          />
          <Field 
            label="Secondary Groups"
            value={formData.secondaryGroups}
            onChange={handleInputChange('secondaryGroups')}
          />
          <Field 
            label="Past Associations"
            value={formData.pastAssociations}
            onChange={handleInputChange('pastAssociations')}
          />
          <Field 
            label="Current Standing"
            value={formData.currentStanding}
            onChange={handleInputChange('currentStanding')}
          />
          <Field 
            label="Loyalty Level"
            value={formData.loyaltyLevel}
            onChange={handleInputChange('loyaltyLevel')}
          />
          <Field 
            label="Role Within Groups"
            value={formData.roleWithinGroups}
            onChange={handleInputChange('roleWithinGroups')}
          />
        </div>
      </SubSection>

      <SubSection title="Responsibilities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Official Duties"
            value={formData.officialDuties}
            onChange={handleInputChange('officialDuties')}
          />
          <Field 
            label="Unofficial Roles"
            value={formData.unofficialRoles}
            onChange={handleInputChange('unofficialRoles')}
          />
          <Field 
            label="Group Contributions"
            value={formData.groupContributions}
            onChange={handleInputChange('groupContributions')}
          />
          <Field 
            label="Expected Services"
            value={formData.expectedServices}
            onChange={handleInputChange('expectedServices')}
          />
          <Field 
            label="Debt Obligations"
            value={formData.debtObligations}
            onChange={handleInputChange('debtObligations')}
          />
          <Field 
            label="Underground Activities"
            value={formData.undergroundActivities}
            onChange={handleInputChange('undergroundActivities')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="SURVEILLANCE & REBELLION">
      <SubSection title="Surveillance Profile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Known Monitoring"
            value={formData.knownMonitoring}
            onChange={handleInputChange('knownMonitoring')}
          />
          <Field 
            label="Evasion Techniques"
            value={formData.evasionTechniques}
            onChange={handleInputChange('evasionTechniques')}
          />
          <Field 
            label="Security Breaches"
            value={formData.securityBreaches}
            onChange={handleInputChange('securityBreaches')}
          />
          <Field 
            label="Digital Traces"
            value={formData.digitalTraces}
            onChange={handleInputChange('digitalTraces')}
          />
          <Field 
            label="Tracking Status"
            value={formData.trackingStatus}
            onChange={handleInputChange('trackingStatus')}
          />
          <Field 
            label="Law Enforcement History"
            value={formData.lawEnforcementHistory}
            onChange={handleInputChange('lawEnforcementHistory')}
          />
        </div>
      </SubSection>

      <SubSection title="Resistance Activities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Past Actions"
            value={formData.pastActions}
            onChange={handleInputChange('pastActions')}
          />
          <Field 
            label="Current Involvement"
            value={formData.currentInvolvement}
            onChange={handleInputChange('currentInvolvement')}
          />
          <Field 
            label="Known Associates"
            value={formData.knownAssociates}
            onChange={handleInputChange('knownAssociates')}
          />
          <Field 
            label="Target History"
            value={formData.targetHistory}
            onChange={handleInputChange('targetHistory')}
          />
          <Field 
            label="Success/Failure Rate"
            value={formData.successRate}
            onChange={handleInputChange('successRate')}
          />
          <Field 
            label="Methods of Resistance"
            value={formData.methodsOfResistance}
            onChange={handleInputChange('methodsOfResistance')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="ENVIRONMENTAL INTERACTION">
      <SubSection title="Urban Navigation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Territory Knowledge"
            value={formData.territoryKnowledge}
            onChange={handleInputChange('territoryKnowledge')}
          />
          <Field 
            label="Safe Houses"
            value={formData.safeHouses}
            onChange={handleInputChange('safeHouses')}
          />
          <Field 
            label="Underground Routes"
            value={formData.undergroundRoutes}
            onChange={handleInputChange('undergroundRoutes')}
          />
          <Field 
            label="Resource Locations"
            value={formData.resourceLocations}
            onChange={handleInputChange('resourceLocations')}
          />
          <Field 
            label="Danger Zones"
            value={formData.dangerZones}
            onChange={handleInputChange('dangerZones')}
          />
        </div>
      </SubSection>

      <SubSection title="Environmental Impact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Pollution Effects"
            value={formData.pollutionEffects}
            onChange={handleInputChange('pollutionEffects')}
          />
          <Field 
            label="Climate Adaptation"
            value={formData.climateAdaptation}
            onChange={handleInputChange('climateAdaptation')}
          />
          <Field 
            label="Resource Access"
            value={formData.resourceAccess}
            onChange={handleInputChange('resourceAccess')}
          />
          <Field 
            label="Territory Control"
            value={formData.territoryControl}
            onChange={handleInputChange('territoryControl')}
          />
          <Field 
            label="Environmental Threats"
            value={formData.environmentalThreats}
            onChange={handleInputChange('environmentalThreats')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="QUOTES & EXPRESSIONS">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextArea 
          label="Notable Quotes"
          value={formData.notableQuotes}
          onChange={handleInputChange('notableQuotes')}
        />
        <TextArea 
          label="Common Phrases"
          value={formData.commonPhrases}
          onChange={handleInputChange('commonPhrases')}
        />
        <TextArea 
          label="Philosophical Statements"
          value={formData.philosophicalStatements}
          onChange={handleInputChange('philosophicalStatements')}
        />
        <Field 
          label="Code Words"
          value={formData.codeWords}
          onChange={handleInputChange('codeWords')}
        />
        <TextArea 
          label="Personal Mantras"
          value={formData.personalMantras}
          onChange={handleInputChange('personalMantras')}
        />
      </div>
    </Section>

    <Section title="CHARACTER DEVELOPMENT">
      <SubSection title="Evolution Points">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field 
            label="Starting State"
            value={formData.startingState}
            onChange={handleInputChange('startingState')}
          />
          <Field 
            label="Critical Decision Points"
            value={formData.criticalDecisionPoints}
            onChange={handleInputChange('criticalDecisionPoints')}
          />
          <TextArea 
            label="Growth Opportunities"
            value={formData.growthOpportunities}
            onChange={handleInputChange('growthOpportunities')}
          />
          <TextArea 
            label="Potential Changes"
            value={formData.potentialChanges}
            onChange={handleInputChange('potentialChanges')}
          />
          <Field 
            label="Breaking Points"
            value={formData.breakingPoints}
            onChange={handleInputChange('breakingPoints')}
          />
        </div>
      </SubSection>

      <SubSection title="Development Questions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextArea 
            label="Technology Impact"
            value={formData.technologyImpact}
            onChange={handleInputChange('technologyImpact')}
          />
          <TextArea 
            label="Moral Evolution"
            value={formData.moralEvolution}
            onChange={handleInputChange('moralEvolution')}
          />
          <TextArea 
            label="Relationship Changes"
            value={formData.relationshipChanges}
            onChange={handleInputChange('relationshipChanges')}
          />
          <TextArea 
            label="Society Role Shifts"
            value={formData.societyRoleShifts}
            onChange={handleInputChange('societyRoleShifts')}
          />
          <TextArea 
            label="Future Trajectories"
            value={formData.futureTrajectories}
            onChange={handleInputChange('futureTrajectories')}
          />
        </div>
      </SubSection>
    </Section>

    <Section title="ADDITIONAL NOTES">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextArea 
          label="Unique Quirks"
          value={formData.uniqueQuirks}
          onChange={handleInputChange('uniqueQuirks')}
        />
        <TextArea 
          label="Story Hooks"
          value={formData.storyHooks}
          onChange={handleInputChange('storyHooks')}
        />
        <TextArea 
          label="Plot Connections"
          value={formData.plotConnections}
          onChange={handleInputChange('plotConnections')}
        />
        <TextArea 
          label="World-Building Elements"
          value={formData.worldBuildingElements}
          onChange={handleInputChange('worldBuildingElements')}
        />
        <TextArea 
          label="Future Possibilities"
          value={formData.futurePossibilities}
          onChange={handleInputChange('futurePossibilities')}
        />
      </div>
    </Section>
  </div>
));

ProfileContent.displayName = 'ProfileContent';

const CyberpunkProfile = () => {
  const profileRef = useRef();
  const [formData, setFormData] = useState({});
  const [viewProfile, setViewProfile] = useState(false);

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    setFormData(savedData);
  }, []);

  const handleInputChange = (fieldName) => (event) => {
    const newFormData = {
      ...formData,
      [fieldName]: event.target.value
    };
    setFormData(newFormData);
    saveToLocalStorage(newFormData);
  };

  const handleExport = () => {
    // Convert form data to formatted text
    let text = "CYBER DYSTOPIAN CHARACTER PROFILE\n\n";
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        // Convert camelCase to Title Case with spaces
        const label = key.replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
        
        text += `${label}: ${value}\n`;
      }
    });

    // Create and trigger download
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'character-profile.txt';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const generateMarkdown = (data) => {
    let md = "# CYBER DYSTOPIAN CHARACTER PROFILE\n\n";
    
    // Define all sections and their fields
    const sections = {
      'CONCEPT & IDENTITY': ['characterName', 'aliases', 'concept', 'age', 'gender', 'ethnicity', 'languages', 'birthplace', 'location', 'socialClass', 'digitalIdentity', 'legalStatus'],
      'PHYSICAL ATTRIBUTES': {
        'Natural Characteristics': ['height', 'weight', 'build', 'eyeColor', 'hair', 'skinTone', 'species', 'voice', 'identifyingMarks'],
        'Technological Augmentations': ['typesAndFunctions', 'visibleModifications', 'internalAugmentations', 'neuralImplants', 'interfaceCapabilities', 'origin', 'maintenanceRequirements', 'knownGlitches', 'sideEffects', 'legalityStatus']
      },
      'PSYCHOLOGICAL PROFILE': {
        'Core Personality': ['generalDemeanor', 'dominantTraits', 'positiveAttributes', 'negativeAttributes', 'fears', 'desires', 'quirks', 'moralCode', 'intelligence', 'emotionalIntelligence', 'personalityType', 'publicPersona'],
        'Mental Health': ['knownConditions', 'digitalAddiction', 'realityPerception', 'copingMechanisms', 'traumaResponse', 'selfAwareness', 'mentalStrengths', 'mentalWeaknesses']
      },
      // Add all other sections similarly...
    };

    // Process sections
    Object.entries(sections).forEach(([sectionTitle, content]) => {
      md += `## ${sectionTitle}\n\n`;
      
      if (typeof content === 'object' && !Array.isArray(content)) {
        // Handle nested subsections
        Object.entries(content).forEach(([subTitle, fields]) => {
          md += `### ${subTitle}\n\n`;
          fields.forEach(field => {
            if (data[field]) {
              const label = field.replace(/([A-Z])/g, ' $1').trim();
              md += `- **${label}:** ${data[field]}\n`;
            }
          });
          md += '\n';
        });
      } else if (Array.isArray(content)) {
        // Handle flat sections
        content.forEach(field => {
          if (data[field]) {
            const label = field.replace(/([A-Z])/g, ' $1').trim();
            md += `- **${label}:** ${data[field]}\n`;
          }
        });
        md += '\n';
      }
    });

    return md;
  };

  const handleExportMarkdown = () => {
    const markdown = generateMarkdown(formData);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'character-profile.md';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportFillableTxt = () => {
    // Create template with all possible fields
    const sections = {
      'CONCEPT & IDENTITY': [
        'Character Name',
        'Aliases/Handle',
        // Add all fields...
      ],
      'PHYSICAL ATTRIBUTES': [
        'Height',
        'Weight',
        // Add all fields...
      ],
      // Add all sections...
    };

    let txtContent = 'CYBER DYSTOPIAN CHARACTER PROFILE\n\n';
    
    Object.entries(sections).forEach(([section, fields]) => {
      txtContent += `=== ${section} ===\n\n`;
      fields.forEach(field => {
        txtContent += `${field}: \n`;
      });
      txtContent += '\n';
    });

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'character-profile-template.txt';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUploadFilledForm = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const parsedData = {};
        content.split('\n').forEach((line) => {
          if (!line.startsWith('===')) {
            const [key, value] = line.split(':');
            if (key && value !== undefined) {
              // Convert the field name to camelCase for the form
              const fieldName = key.trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
              parsedData[fieldName] = value.trim();
            }
          }
        });
        
        setFormData((prevData) => ({ ...prevData, ...parsedData }));
        setViewProfile(true);
      };
      reader.readAsText(file);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => profileRef.current,
    documentTitle: 'Character Profile',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        html, body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
      setFormData({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div>
      <ProfileContent 
        ref={profileRef} 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handlePrint={handlePrint}
        handleExport={handleExport}
        handleExportMarkdown={handleExportMarkdown}
        handleExportFillableTxt={handleExportFillableTxt}
        handleUploadFilledForm={handleUploadFilledForm}
        handleClearForm={handleClearForm}
      />
      {viewProfile && <ProfilePage character={formData} />}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

SubSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

PrintButton.propTypes = {
  onPrint: PropTypes.func.isRequired,
};

ExportButton.propTypes = {
  onExport: PropTypes.func.isRequired,
};

ExportMarkdownButton.propTypes = {
  onExport: PropTypes.func.isRequired,
};

ExportFillableTxtButton.propTypes = {
  onExport: PropTypes.func.isRequired,
};

UploadFilledFormButton.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

ClearFormButton.propTypes = {
  onClear: PropTypes.func.isRequired,
};

ProfileContent.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handlePrint: PropTypes.func.isRequired,
  handleExport: PropTypes.func.isRequired,
  handleExportMarkdown: PropTypes.func.isRequired,
  handleExportFillableTxt: PropTypes.func.isRequired,
  handleUploadFilledForm: PropTypes.func.isRequired,
  handleClearForm: PropTypes.func.isRequired,
  ref: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default CyberpunkProfile;