

'use client';
import React, { useState, useEffect } from 'react';
import { useMedical } from './MedicalContext';

const AddPatient: React.FC = () => {
  const [name, setName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [editingRecord, setEditingRecord] = useState<PatientRecord | null>(null);
  const { dispatch } = useMedical();

  useEffect(() => {
    if (editingRecord) {
      setName(editingRecord.name);
      setDiagnosis(editingRecord.diagnosis);
    }
  }, [editingRecord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      dispatch({ type: 'EDIT_RECORD', payload: { ...editingRecord, name, diagnosis } });
      setEditingRecord(null);
    } else {
      const newRecord = { id: Date.now(), name, diagnosis };
      dispatch({ type: 'ADD_RECORD', payload: newRecord });
    }
    setName('');
    setDiagnosis('');
  };

  const handleEdit = (record: PatientRecord) => {
    setEditingRecord(record);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Patient Name"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
        <input
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Diagnosis"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {editingRecord ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default AddPatient;




