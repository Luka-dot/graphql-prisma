import { extractFragmentReplacements } from 'prisma-binding'
import { getFirstName, isValidPassword } from '../src/utils/user'

test('should return first name out of full name', () => {
    const firstName = getFirstName('Lukas kotrc')
    
    expect(firstName).toBe('Lukas')
})

test('should return first name if only first name was given', () => {
    const firstName = getFirstName('Jen')

    expect(firstName).toBe('Jen')
})

test('should reject password shorter 8 characters', () => {
    const password = isValidPassword('pas123')

    expect(password).toBe(false)
})

test('should reject password that includes world password', () => {
    const password = isValidPassword('Password')

    expect(password).toBe(false)
})

test('should password be at least 8 characters', () => {
    const password = isValidPassword('pas123456')

    expect(password).toBe(true)
})