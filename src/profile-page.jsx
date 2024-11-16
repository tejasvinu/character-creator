import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold mb-3">{title}</h2>
    {children}
  </div>
);

const Field = ({ label, value }) => (
  value ? (
    <p className="mb-2">
      <strong>{label}:</strong> {value}
    </p>
  ) : null
);

const ProfilePage = ({ character }) => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">{character.characterName || 'Character Profile'}</h1>
    
    <Section title="Concept & Identity">
      <Field label="Aliases" value={character.aliases} />
      <Field label="Concept" value={character.concept} />
      <Field label="Age" value={character.age} />
      <Field label="Gender" value={character.gender} />
      <Field label="Ethnicity" value={character.ethnicity} />
      {/* Add more fields as needed */}
    </Section>

    <Section title="Physical Attributes">
      <Field label="Height" value={character.height} />
      <Field label="Weight" value={character.weight} />
      <Field label="Build" value={character.build} />
      {/* Add more fields as needed */}
    </Section>

    {/* Add more sections following the same pattern */}
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

ProfilePage.propTypes = {
  character: PropTypes.shape({
    characterName: PropTypes.string,
    aliases: PropTypes.string,
    concept: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string,
    ethnicity: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    build: PropTypes.string,
    // Add more prop types as needed
  }).isRequired,
};

export default ProfilePage;
