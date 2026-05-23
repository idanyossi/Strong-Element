import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { he } from '@/locales/he';

const { login: t } = he;

export default function LoginModal({ open, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(username, password);
      onClose();
      setUsername('');
      setPassword('');
    } catch {
      setError(t.invalid);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open) => {
    if (!open) {
      onClose();
      setError('');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm rounded-none">
        <DialogHeader>
          <DialogTitle className="text-[#0A1628] text-xl font-bold">{t.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label>{t.usernameLabel}</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-none mt-1"
              autoComplete="username"
            />
          </div>
          <div>
            <Label>{t.passwordLabel}</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-none mt-1"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0A1628] hover:bg-[#1B2D4F] rounded-none"
          >
            {isLoading && <Loader2 className="ms-2 h-4 w-4 animate-spin" />}
            {t.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
