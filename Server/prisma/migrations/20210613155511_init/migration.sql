-- AddForeignKey
ALTER TABLE "Friend" ADD FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
