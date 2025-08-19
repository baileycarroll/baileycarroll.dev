import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateSelector, { DateField } from '../DateSelector';

describe('DateSelector', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with basic props', () => {
    render(
      <DateSelector
        value="2024-01-15"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByDisplayValue('2024-01-15');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('2024-01-15');
  });

  it('renders with label when provided', () => {
    render(
      <DateSelector
        label="Test Date"
        value="2024-01-15"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Test Date')).toBeInTheDocument();
  });

  it('shows required indicator when required is true', () => {
    render(
      <DateSelector
        label="Test Date"
        value="2024-01-15"
        onChange={mockOnChange}
        required
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(
      <DateSelector
        value="2024-01-15"
        onChange={mockOnChange}
        error="Date is required"
      />
    );

    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('shows help text when provided', () => {
    render(
      <DateSelector
        label="Test Date"
        value="2024-01-15"
        onChange={mockOnChange}
        helpText="Select a date"
      />
    );

    expect(screen.getByText('Select a date')).toBeInTheDocument();
  });

  it('calls onChange when date is changed', () => {
    render(
      <DateSelector
        value="2024-01-15"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByDisplayValue('2024-01-15');
    fireEvent.change(input, { target: { value: '2024-02-20' } });

    expect(mockOnChange).toHaveBeenCalledWith('2024-02-20');
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <DateSelector
        value="2024-01-15"
        onChange={mockOnChange}
        disabled
      />
    );

    const input = screen.getByDisplayValue('2024-01-15');
    expect(input).toBeDisabled();
  });
});

describe('DateField', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with label and required indicator', () => {
    render(
      <DateField
        label="Test Date"
        value="2024-01-15"
        onChange={mockOnChange}
        required
      />
    );

    expect(screen.getByText('Test Date')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(
      <DateField
        label="Test Date"
        value="2024-01-15"
        onChange={mockOnChange}
        error="Date is required"
      />
    );

    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('calls onChange when date is changed', () => {
    render(
      <DateField
        label="Test Date"
        value="2024-01-15"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByDisplayValue('2024-01-15');
    fireEvent.change(input, { target: { value: '2024-02-20' } });

    expect(mockOnChange).toHaveBeenCalledWith('2024-02-20');
  });
});
